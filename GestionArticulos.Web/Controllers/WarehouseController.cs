using System.Collections.Generic;
using System.Threading.Tasks;
using GestionArticulos.Core.Domain;
using GestionArticulos.Services.Abstract;
using GestionArticulos.Services.Framework;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace GestionArticulos.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WarehouseController : Controller
    {
        private readonly IWarehouseService warehouseService;
        public WarehouseController(IWarehouseService warehouseService) => this.warehouseService = warehouseService;

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
       {
            var x = await warehouseService.GetAll();
            return Ok(x);
        }
    }
}