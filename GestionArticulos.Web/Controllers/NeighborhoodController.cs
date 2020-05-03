using System.Threading.Tasks;
using GestionArticulos.Services.Abstract;
using Microsoft.AspNetCore.Mvc;

namespace GestionArticulos.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NeighborhoodController : Controller
    {
        private readonly INeighborhoodService neighborhoodService;
        public NeighborhoodController(INeighborhoodService neighborhoodService) => this.neighborhoodService = neighborhoodService;

        [HttpGet("GetByMunicipalityId/{municipalityId}")]
        public async Task<IActionResult> GetByMunicipalityId(int municipalityId) => Ok(await neighborhoodService.GetByMunicipalityId(municipalityId));
    }
}