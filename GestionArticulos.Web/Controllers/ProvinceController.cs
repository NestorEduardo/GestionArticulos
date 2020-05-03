using System.Threading.Tasks;
using GestionArticulos.Services.Abstract;
using Microsoft.AspNetCore.Mvc;

namespace GestionArticulos.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProvinceController : Controller
    {
        private readonly IProvinceService provinceService;
        public ProvinceController(IProvinceService provinceService) => this.provinceService = provinceService;

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll() => Ok(await provinceService.GetAll());
    }
}