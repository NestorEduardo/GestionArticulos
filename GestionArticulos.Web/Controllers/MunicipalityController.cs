using System.Threading.Tasks;
using GestionArticulos.Services.Abstract;
using Microsoft.AspNetCore.Mvc;

namespace GestionArticulos.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MunicipalityController : Controller
    {
        private readonly IMunicipalityService municipalityService;
        public MunicipalityController(IMunicipalityService municipalityService) => this.municipalityService = municipalityService;

        [HttpGet("GetByProvinceId/{provinceId}")]
        public async Task<IActionResult> GetByProvinceId(int provinceId) => Ok(await municipalityService.GetByProvinceId(provinceId));
    }
}