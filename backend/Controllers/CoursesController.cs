using CentroTecnico.Api_BackEnd.Data;
using CentroTecnico.Api__BackEnd.Domain.Entities;
using CentroTecnico.Api__BackEnd.Dtos.Courses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CentroTecnico.Api_BackEnd.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CoursesController : ControllerBase
{
    private readonly AppDbContext _db;
    public CoursesController(AppDbContext db) => _db = db;

    // PUBLICO
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<List<CourseDto>>> GetAll(
        [FromQuery] bool onlyActive = false,
        CancellationToken ct = default)
    {
        var q = _db.Courses.AsNoTracking().OrderByDescending(c => c.CreatedAt);

        if (onlyActive)
            q = q.Where(x => x.IsActive).OrderByDescending(c => c.CreatedAt);

        var items = await q.Select(c => new CourseDto
        {
            Id = c.Id,
            Title = c.Title,
            Level = c.Level,
            Duration = c.Duration,
            Price = c.Price,
            IsActive = c.IsActive
        }).ToListAsync(ct);

        return Ok(items);
    }

    // PUBLICO
    [HttpGet("{id:guid}")]
    [AllowAnonymous]
    public async Task<ActionResult<CourseDto>> GetById(Guid id, CancellationToken ct = default)
    {
        var item = await _db.Courses.AsNoTracking()
            .Where(c => c.Id == id)
            .Select(c => new CourseDto
            {
                Id = c.Id,
                Title = c.Title,
                Level = c.Level,
                Duration = c.Duration,
                Price = c.Price,
                IsActive = c.IsActive
            })
            .FirstOrDefaultAsync(ct);

        if (item is null) return NotFound();

        return Ok(item);
    }

    // PRIVADO
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<CourseDto>> Create(CourseCreateDto dto, CancellationToken ct = default)
    {
        var entity = new Course
        {
            Id = Guid.NewGuid(),
            Title = dto.Title.Trim(),
            Level = dto.Level?.Trim(),
            Duration = dto.Duration?.Trim(),
            Price = dto.Price?.Trim(),
            IsActive = dto.IsActive,
            CreatedAt = DateTime.UtcNow
        };

        _db.Courses.Add(entity);
        await _db.SaveChangesAsync(ct);

        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, entity);
    }

    // PRIVADO
    [HttpPut("{id:guid}")]
    [Authorize]
    public async Task<IActionResult> Update(Guid id, CourseUpdateDto dto, CancellationToken ct = default)
    {
        var entity = await _db.Courses.FirstOrDefaultAsync(c => c.Id == id, ct);
        if (entity is null) return NotFound();

        entity.Title = dto.Title.Trim();
        entity.Level = dto.Level?.Trim();
        entity.Duration = dto.Duration?.Trim();
        entity.Price = dto.Price?.Trim();
        entity.IsActive = dto.IsActive;

        await _db.SaveChangesAsync(ct);
        return NoContent();
    }

    // PRIVADO
    [HttpDelete("{id:guid}")]
    [Authorize]
    public async Task<IActionResult> Delete(Guid id, CancellationToken ct = default)
    {
        var entity = await _db.Courses.FirstOrDefaultAsync(c => c.Id == id, ct);
        if (entity is null) return NotFound();

        _db.Courses.Remove(entity);
        await _db.SaveChangesAsync(ct);

        return NoContent();
    }
}