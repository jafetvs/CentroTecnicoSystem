using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CentroTecnico.Api__BackEnd.Domain.Entities;

[Table("category_photos")]
public class CategoryPhoto
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Required]
    [Column("category_id")]
    public Guid CategoryId { get; set; }

    [Required, MaxLength(800)]
    [Column("photo_url")]
    public string PhotoUrl { get; set; } = string.Empty;

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Category? Category { get; set; }
}