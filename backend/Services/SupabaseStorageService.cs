using System.Net.Http.Headers;

namespace CentroTecnico.Api_BackEnd.Services;

public class SupabaseStorageService
{
    private readonly HttpClient _httpClient;
    private readonly SupabaseStorageOptions _options;

    private static readonly HashSet<string> AllowedExtensions = new(StringComparer.OrdinalIgnoreCase)
    {
        ".jpg",
        ".jpeg",
        ".png",
        ".webp"
    };

    private const long MaxFileSizeBytes = 5 * 1024 * 1024; // 5 MB

    public SupabaseStorageService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;

        _options = configuration
            .GetSection("SupabaseStorage")
            .Get<SupabaseStorageOptions>() ?? new SupabaseStorageOptions();

        if (string.IsNullOrWhiteSpace(_options.Url) ||
            string.IsNullOrWhiteSpace(_options.ServiceRoleKey) ||
            string.IsNullOrWhiteSpace(_options.Bucket))
        {
            throw new InvalidOperationException("La configuración de SupabaseStorage está incompleta.");
        }

        _httpClient.DefaultRequestHeaders.Clear();
        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", _options.ServiceRoleKey);

        _httpClient.DefaultRequestHeaders.Add("apikey", _options.ServiceRoleKey);
    }

    public async Task<string> UploadFileAsync(
        IFormFile file,
        string folder,
        CancellationToken ct = default)
    {
        ValidateFile(file);

        var extension = Path.GetExtension(file.FileName);
        var uniqueFileName = $"{Guid.NewGuid()}{extension}";
        var safeFolder = folder.Trim('/');

        var filePath = string.IsNullOrWhiteSpace(safeFolder)
            ? uniqueFileName
            : $"{safeFolder}/{uniqueFileName}";

        await using var stream = file.OpenReadStream();
        using var content = new StreamContent(stream);

        content.Headers.ContentType =
            new MediaTypeHeaderValue(file.ContentType ?? "application/octet-stream");

        var requestUri =
            $"{_options.Url}/storage/v1/object/{_options.Bucket}/{filePath}";

        using var request = new HttpRequestMessage(HttpMethod.Post, requestUri)
        {
            Content = content
        };

        request.Headers.Add("x-upsert", "false");

        using var response = await _httpClient.SendAsync(request, ct);

        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Content.ReadAsStringAsync(ct);
            throw new InvalidOperationException(
                $"Error subiendo archivo a Supabase Storage. Status: {(int)response.StatusCode}. Detalle: {error}");
        }

        return GetPublicUrl(filePath);
    }

    public async Task DeleteFileByPublicUrlAsync(string publicUrl, CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(publicUrl))
            return;

        var marker = $"/storage/v1/object/public/{_options.Bucket}/";
        var index = publicUrl.IndexOf(marker, StringComparison.OrdinalIgnoreCase);

        if (index < 0)
            return;

        var filePath = publicUrl[(index + marker.Length)..];

        var requestUri =
            $"{_options.Url}/storage/v1/object/{_options.Bucket}/{filePath}";

        using var request = new HttpRequestMessage(HttpMethod.Delete, requestUri);
        using var response = await _httpClient.SendAsync(request, ct);

        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Content.ReadAsStringAsync(ct);
            throw new InvalidOperationException(
                $"Error eliminando archivo en Supabase Storage. Status: {(int)response.StatusCode}. Detalle: {error}");
        }
    }

    public string GetPublicUrl(string filePath)
    {
        filePath = filePath.TrimStart('/');
        return $"{_options.Url}/storage/v1/object/public/{_options.Bucket}/{filePath}";
    }

    private static void ValidateFile(IFormFile file)
    {
        if (file == null || file.Length == 0)
            throw new InvalidOperationException("El archivo está vacío.");

        if (file.Length > MaxFileSizeBytes)
            throw new InvalidOperationException("El archivo supera el tamaño máximo permitido de 5 MB.");

        var extension = Path.GetExtension(file.FileName);

        if (string.IsNullOrWhiteSpace(extension) || !AllowedExtensions.Contains(extension))
            throw new InvalidOperationException("Formato no permitido. Solo se aceptan .jpg, .jpeg, .png y .webp.");
    }
}