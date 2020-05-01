using System.Collections.Generic;
using GestionArticulos.Core.Domain;
using GestionArticulos.Services.Abstract;
using GestionArticulos.Services.Framework;
using Microsoft.AspNetCore.Mvc;

namespace GestionArticulos.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WarehouseController : Controller
    {
        private readonly IWarehouseService warehouseService;
        public WarehouseController(IWarehouseService warehouseService) => this.warehouseService = warehouseService;

        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            List<Warehouse> warehouses = warehouseService.GetAll();
            return Ok(warehouses);
        }
    }
}