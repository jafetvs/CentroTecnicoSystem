using CentroTecnico.Api__BackEnd.Dtos.Categories;
using CentroTecnico.Api__BackEnd.Domain.Entities;
using CentroTecnico.Api_BackEnd.Data;
using CentroTecnico.Api_BackEnd.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CentroTecnico.Api_BackEnd.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly SupabaseStorageService _storageService;

    public CategoriesController(AppDbContext db, SupabaseStorageService storageService)
    {
        _db = db;
        _storageService = storageService;
    }

    // PUBLICO - LISTAR CATEGORIAS
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<object>> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 12,
        CancellationToken ct = default)
    {
        page = page < 1 ? 1 : page;
        pageSize = pageSize < 1 ? 12 : pageSize > 50 ? 50 : pageSize;

        var query = _db.Categories
            .AsNoTracking()
            .OrderByDescending(c => c.CreatedAt)
            .Select(c => new CategoryListDto
            {
                Id = c.Id,
                Name = c.Name,
                Description = c.Description,
                CoverUrl = c.CoverUrl,
                PhotosCount = c.Photos.Count
            });

        var total = await query.CountAsync(ct);

        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(ct);

        return Ok(new { page, pageSize, total, items });
    }

    // PUBLICO - OBTENER CATEGORIA POR ID
    [HttpGet("{id:guid}")]
    [AllowAnonymous]
    public async Task<ActionResult<CategoryDetailDto>> GetById(Guid id, CancellationToken ct = default)
    {
        var cat = await _db.Categories
            .AsNoTracking()
            .Where(c => c.Id == id)
            .Select(c => new CategoryDetailDto
            {
                Id = c.Id,
                Name = c.Name,
                Description = c.Description,
                CoverUrl = c.CoverUrl,
                Photos = c.Photos
                    .OrderByDescending(p => p.CreatedAt)
                    .Select(p => new CategoryPhotoDto
                    {
                        Id = p.Id,
                        PhotoUrl = p.PhotoUrl
                    })
                    .ToList()
            })
            .FirstOrDefaultAsync(ct);

        if (cat is null)
            return NotFound(new { message = "Categoría no encontrada." });

        return Ok(cat);
    }

    // PRIVADO - CREAR CATEGORIA CON PORTADA OPCIONAL
    [HttpPost]
    [Authorize]
    [Consumes("multipart/form-data")]
    public async Task<ActionResult<CategoryDetailDto>> Create(
        [FromForm] CategoryCreateWithFileDto dto,
        CancellationToken ct = default)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        string? coverUrl = null;

        if (dto.CoverFile is not null)
        {
            coverUrl = await _storageService.UploadFileAsync(
                dto.CoverFile,
                "categories/covers",
                ct);
        }

        var entity = new Category
        {
            Id = Guid.NewGuid(),
            Name = dto.Name.Trim(),
            Description = dto.Description?.Trim(),
            CoverUrl = coverUrl,
            CreatedAt = DateTime.UtcNow
        };

        _db.Categories.Add(entity);
        await _db.SaveChangesAsync(ct);

        var result = new CategoryDetailDto
        {
            Id = entity.Id,
            Name = entity.Name,
            Description = entity.Description,
            CoverUrl = entity.CoverUrl,
            Photos = new List<CategoryPhotoDto>()
        };

        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, result);
    }

    // PRIVADO - AGREGAR UNA O VARIAS FOTOS A UNA CATEGORIA
    [HttpPost("{id:guid}/photos")]
    [Authorize]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> AddPhotos(
        Guid id,
        [FromForm] CategoryPhotosUploadDto dto,
        CancellationToken ct = default)
    {
        if (dto.Files == null || dto.Files.Count == 0)
            return BadRequest(new { message = "Debes enviar al menos una imagen." });

        var categoryExists = await _db.Categories.AnyAsync(c => c.Id == id, ct);

        if (!categoryExists)
            return NotFound(new { message = "Categoría no encontrada." });

        var entities = new List<CategoryPhoto>();

        foreach (var file in dto.Files)
        {
            var photoUrl = await _storageService.UploadFileAsync(
                file,
                $"categories/{id}",
                ct);

            entities.Add(new CategoryPhoto
            {
                Id = Guid.NewGuid(),
                CategoryId = id,
                PhotoUrl = photoUrl,
                CreatedAt = DateTime.UtcNow
            });
        }

        _db.CategoryPhotos.AddRange(entities);
        await _db.SaveChangesAsync(ct);

        return Ok(new
        {
            message = "Fotos agregadas correctamente.",
            count = entities.Count,
            photos = entities.Select(p => new
            {
                p.Id,
                p.PhotoUrl
            })
        });
    }

    // PRIVADO - ACTUALIZAR CATEGORIA
    [HttpPut("{id:guid}")]
    [Authorize]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Update(
        Guid id,
        [FromForm] CategoryUpdateWithFileDto dto,
        CancellationToken ct = default)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        var entity = await _db.Categories.FirstOrDefaultAsync(c => c.Id == id, ct);

        if (entity is null)
            return NotFound(new { message = "Categoría no encontrada." });

        entity.Name = dto.Name.Trim();
        entity.Description = dto.Description?.Trim();

        if (dto.CoverFile is not null)
        {
            if (!string.IsNullOrWhiteSpace(entity.CoverUrl))
            {
                await _storageService.DeleteFileByPublicUrlAsync(entity.CoverUrl, ct);
            }

            entity.CoverUrl = await _storageService.UploadFileAsync(
                dto.CoverFile,
                "categories/covers",
                ct);
        }

        await _db.SaveChangesAsync(ct);
        return NoContent();
    }

    // PRIVADO - ELIMINAR FOTO INDIVIDUAL
    [HttpDelete("photos/{photoId:guid}")]
    [Authorize]
    public async Task<IActionResult> DeletePhoto(Guid photoId, CancellationToken ct = default)
    {
        var photo = await _db.CategoryPhotos.FirstOrDefaultAsync(p => p.Id == photoId, ct);

        if (photo is null)
            return NotFound(new { message = "Foto no encontrada." });

        if (!string.IsNullOrWhiteSpace(photo.PhotoUrl))
        {
            await _storageService.DeleteFileByPublicUrlAsync(photo.PhotoUrl, ct);
        }

        _db.CategoryPhotos.Remove(photo);
        await _db.SaveChangesAsync(ct);

        return NoContent();
    }

    // PRIVADO - ELIMINAR CATEGORIA Y SUS FOTOS
    [HttpDelete("{id:guid}")]
    [Authorize]
    public async Task<IActionResult> Delete(Guid id, CancellationToken ct = default)
    {
        var entity = await _db.Categories
            .Include(c => c.Photos)
            .FirstOrDefaultAsync(c => c.Id == id, ct);

        if (entity is null)
            return NotFound(new { message = "Categoría no encontrada." });

        if (!string.IsNullOrWhiteSpace(entity.CoverUrl))
        {
            await _storageService.DeleteFileByPublicUrlAsync(entity.CoverUrl, ct);
        }

        foreach (var photo in entity.Photos)
        {
            if (!string.IsNullOrWhiteSpace(photo.PhotoUrl))
            {
                await _storageService.DeleteFileByPublicUrlAsync(photo.PhotoUrl, ct);
            }
        }

        _db.Categories.Remove(entity);
        await _db.SaveChangesAsync(ct);

        return NoContent();
    }
}