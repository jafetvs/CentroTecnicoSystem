namespace CentroTecnico.Api__BackEnd.Dtos.Admin;
using System.ComponentModel.DataAnnotations;

public class AdminCreateDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = "";

    [Required]
    [MinLength(5)]
    public string Password { get; set; } = "";
}

public class AdminDto
{
    public Guid Id { get; set; }
    public string Email { get; set; } = "";
}

public class ChangePasswordDto
{
    [Required]
    public string NewPassword { get; set; } = "";
}
