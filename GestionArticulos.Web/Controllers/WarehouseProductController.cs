using GestionArticulos.Core.Domain;
using GestionArticulos.Services.Abstract;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace GestionArticulos.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WarehouseProductController : Controller
    {
        private readonly IWarehouseProductService warehouseProductService;
        public WarehouseProductController(IWarehouseProductService warehouseProductService) => this.warehouseProductService = warehouseProductService;

        [HttpGet("GetByWarehouseId/{id}")]
        public async Task<IActionResult> GetByWarehouseId(int id) => Ok(await warehouseProductService.GetByWarehouseId(id));

        [HttpPost("AddProduct")]
        public async Task<IActionResult> Add([FromBody] Warehouse warehouse, Product product, int count)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                return Ok(await warehouseProductService.AddProduct(warehouse.Id, product.Id, count));
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Error = ex.Message
                });
            }
        }
        [HttpPost("RemoveProduct")]
        public async Task<IActionResult> Remove([FromBody] Warehouse warehouse, Product product, int count)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                return Ok(await warehouseProductService.RemoveProduct(warehouse.Id, product.Id, count));
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Error = ex.Message
                });
            }
        }
    }
}