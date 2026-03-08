using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CentroTecnico.Api__BackEnd.Domain.Entities;

[Table("categories")]
public class Category
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Required, MaxLength(80)]
    [Column("name")]
    public string Name { get; set; } = string.Empty;

    [MaxLength(250)]
    [Column("description")]
    public string? Description { get; set; }

    [MaxLength(500)]
    [Column("cover_url")]
    public string? CoverUrl { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // navegación
    public ICollection<CategoryPhoto> Photos { get; set; } = new List<CategoryPhoto>();
}