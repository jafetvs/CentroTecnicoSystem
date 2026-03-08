using CentroTecnico.Api__BackEnd.Domain.Entities;
using CentroTecnico.Api__BackEnd.Dtos.Admin;
using CentroTecnico.Api_BackEnd.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CentroTecnico.Api_BackEnd.Controllers;

[ApiController]
[Route("api/admin")]
[Authorize] // TODO el controller protegido
public class AdminController : ControllerBase
{
    private readonly AppDbContext _db;

    public AdminController(AppDbContext db)
    {
        _db = db;
    }

    // CREAR ADMIN
    [HttpPost]
    public async Task<IActionResult> Create(AdminCreateDto dto)
    {
        var exists = await _db.AdminUsers.AnyAsync(a => a.Email == dto.Email);

        if (exists)
            return BadRequest("El admin ya existe");

        var admin = new AdminUser
        {
            Id = Guid.NewGuid(),
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
        };

        _db.AdminUsers.Add(admin);
        await _db.SaveChangesAsync();

        return Ok(new
        {
            admin.Id,
            admin.Email
        });
    }

    // HASH PASSWORD
    [HttpGet("hash/{password}")]
    public string Hash(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }

    // LISTAR ADMINS
    [HttpGet]
    public async Task<ActionResult<List<AdminDto>>> GetAll()
    {
        var admins = await _db.AdminUsers
            .Select(a => new AdminDto
            {
                Id = a.Id,
                Email = a.Email
            })
            .ToListAsync();

        return admins;
    }

    // CAMBIAR PASSWORD
    [HttpPut("{id}/password")]
    public async Task<IActionResult> ChangePassword(Guid id, ChangePasswordDto dto)
    {
        var admin = await _db.AdminUsers.FindAsync(id);

        if (admin == null)
            return NotFound();

        admin.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);

        await _db.SaveChangesAsync();

        return Ok("Contraseña actualizada");
    }

    // ELIMINAR ADMIN
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var admin = await _db.AdminUsers.FindAsync(id);

        if (admin == null)
            return NotFound();

        _db.AdminUsers.Remove(admin);
        await _db.SaveChangesAsync();

        return Ok("Admin eliminado");
    }
}