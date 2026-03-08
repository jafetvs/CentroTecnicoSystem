using CentroTecnico.Api__BackEnd.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CentroTecnico.Api_BackEnd.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Category> Categories => Set<Category>();
    public DbSet<CategoryPhoto> CategoryPhotos => Set<CategoryPhoto>();
    public DbSet<Course> Courses => Set<Course>();
    public DbSet<AdminUser> AdminUsers => Set<AdminUser>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Relación Category (1) -> (N) CategoryPhotos
        modelBuilder.Entity<Category>()
            .HasMany(c => c.Photos)
            .WithOne(p => p.Category)
            .HasForeignKey(p => p.CategoryId)
            .OnDelete(DeleteBehavior.Cascade);

        // Índice útil para búsquedas por nombre
        modelBuilder.Entity<Category>()
            .HasIndex(c => c.Name)
            .IsUnique(false);

        // Índice útil para fotos por categoría
        modelBuilder.Entity<CategoryPhoto>()
            .HasIndex(p => p.CategoryId);

        // Índice útil para admins por email
        modelBuilder.Entity<AdminUser>()
            .HasIndex(a => a.Email)
            .IsUnique(true);
    }
}