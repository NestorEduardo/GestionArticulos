using System.Threading.Tasks;
using GestionArticulos.Services.Abstract;
using Microsoft.AspNetCore.Mvc;

namespace GestionArticulos.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovementController : Controller
    {
        private readonly IMovementService movementService;
        public MovementController(IMovementService movementService)
        {
            this.movementService = movementService;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll() => Ok(await movementService.GetAll());
    }
}