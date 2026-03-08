using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CentroTecnico.Api__BackEnd.Domain.Entities;

[Table("courses")]
public class Course
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Required, MaxLength(120)]
    [Column("title")]
    public string Title { get; set; } = string.Empty;

    [MaxLength(60)]
    [Column("level")]
    public string? Level { get; set; }

    [MaxLength(60)]
    [Column("duration")]
    public string? Duration { get; set; }

    [MaxLength(40)]
    [Column("price")]
    public string? Price { get; set; } // ej: "150$"

    [Column("is_active")]
    public bool IsActive { get; set; } = true;

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}