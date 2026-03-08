namespace CentroTecnico.Api__BackEnd.Dtos.Courses;
using System.ComponentModel.DataAnnotations;

public class CourseDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = "";
    public string? Level { get; set; }
    public string? Duration { get; set; }
    public string? Price { get; set; }
    public bool IsActive { get; set; }
}

public class CourseCreateDto
{
    [Required, MaxLength(120)]
    public string Title { get; set; } = "";

    [MaxLength(60)]
    public string? Level { get; set; }

    [MaxLength(60)]
    public string? Duration { get; set; }

    [MaxLength(40)]
    public string? Price { get; set; }

    public bool IsActive { get; set; } = true;
}

public class CourseUpdateDto : CourseCreateDto { }
