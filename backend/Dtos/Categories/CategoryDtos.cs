using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace CentroTecnico.Api__BackEnd.Dtos.Categories;

public class CategoryListDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = "";
    public string? Description { get; set; }
    public string? CoverUrl { get; set; }
    public int PhotosCount { get; set; }
}

public class CategoryDetailDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = "";
    public string? Description { get; set; }
    public string? CoverUrl { get; set; }

    public List<CategoryPhotoDto> Photos { get; set; } = new();
}

public class CategoryPhotoDto
{
    public Guid Id { get; set; }
    public string PhotoUrl { get; set; } = "";
}






/* ===========================
   DTOs PARA CREAR / ACTUALIZAR
   =========================== */

public class CategoryCreateWithFileDto
{
    [Required, MaxLength(80)]
    public string Name { get; set; } = "";

    [MaxLength(250)]
    public string? Description { get; set; }

    // portada opcional
    public IFormFile? CoverFile { get; set; }
}

public class CategoryUpdateWithFileDto
{
    [Required, MaxLength(80)]
    public string Name { get; set; } = "";

    [MaxLength(250)]
    public string? Description { get; set; }

    // cambiar portada opcional
    public IFormFile? CoverFile { get; set; }
}





/* ===========================
   DTO PARA SUBIR FOTOS
   =========================== */

public class CategoryPhotosUploadDto
{
    public List<IFormFile> Files { get; set; } = new();
}