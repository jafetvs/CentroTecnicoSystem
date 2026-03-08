using CentroTecnico.Api__BackEnd.Dtos.Auth;
using CentroTecnico.Api_BackEnd.Data;
using CentroTecnico.Api_BackEnd.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CentroTecnico.Api_BackEnd.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly JwtService _jwt;

    public AuthController(AppDbContext db, JwtService jwt)
    {
        _db = db;
        _jwt = jwt;
    }

    [HttpGet("dbtest")]
    public async Task<IActionResult> DbTest()
    {
        var time = DateTime.Now;

        var count = await _db.AdminUsers.CountAsync();

        var elapsed = DateTime.Now - time;

        return Ok(new
        {
            count,
            elapsed = elapsed.TotalMilliseconds
        });
    }

    [HttpGet("testdb")]
    public async Task<IActionResult> TestDb()
    {
        var start = DateTime.UtcNow;

        await _db.Database.ExecuteSqlRawAsync("SELECT 1");

        var elapsed = DateTime.UtcNow - start;

        return Ok(new { tiempo = elapsed.TotalMilliseconds });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var admin = await _db.AdminUsers
            .FirstOrDefaultAsync(x => x.Email == dto.Email);

        if (admin == null)
            return Unauthorized("Usuario no encontrado");

        var valid = BCrypt.Net.BCrypt.Verify(dto.Password, admin.PasswordHash);

        if (!valid)
            return Unauthorized("Contraseña incorrecta");

        var token = _jwt.GenerateToken(admin);

        return Ok(new
        {
            token,
            email = admin.Email
        });
    }
}