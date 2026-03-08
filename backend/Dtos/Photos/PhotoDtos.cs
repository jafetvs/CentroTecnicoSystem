namespace CentroTecnico.Api__BackEnd.Dtos.Photos;
using System.ComponentModel.DataAnnotations;

public class PhotoCreateDto
{
    [Required]
    public Guid CategoryId { get; set; }

    [Required, MaxLength(800)]
    public string Url { get; set; } = "";

    [MaxLength(120)]
    public string? Alt { get; set; }

    public int SortOrder { get; set; } = 0;
}

public class PhotoUpdateDto
{
    [Required, MaxLength(800)]
    public string Url { get; set; } = "";

    [MaxLength(120)]
    public string? Alt { get; set; }

    public int SortOrder { get; set; } = 0;
}
