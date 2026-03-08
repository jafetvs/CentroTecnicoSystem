using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CentroTecnicoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CursosController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("API funcionando 🚀");
        }
    }
}
