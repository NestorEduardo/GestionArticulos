using GestionArticulos.Core.Domain;
using GestionArticulos.Services.Abstract;
using GestionArticulos.Web.ViewModels;
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

        [HttpPost("addWarehouseProduct")]
        public async Task<IActionResult> Add([FromBody] AddWarehouseProductViewModel addWarehouseProductViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                return Ok(await warehouseProductService.AddProduct(addWarehouseProductViewModel.WarehouseId, addWarehouseProductViewModel.ProductId, addWarehouseProductViewModel.Count));
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
        public async Task<IActionResult> Remove([FromBody] AddWarehouseProductViewModel addWarehouseProductViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                return Ok(await warehouseProductService.RemoveProduct(addWarehouseProductViewModel.WarehouseId, addWarehouseProductViewModel.ProductId, addWarehouseProductViewModel.Count));
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Error = ex.Message
                });
            }
        }

        [HttpGet("GetProductCountByWarehouse/{warehouseId}/{productId}")]
        public async Task<IActionResult> GetProductCountByWarehouse(int warehouseId, int productId)
        {
            return Ok(await warehouseProductService.GetProductCountByWarehouse(warehouseId, productId));
        }

        [HttpGet("GetRemainingCapacityByWarehouse/{warehouseId}")]
        public async Task<IActionResult> GetRemainingCapacityByWarehouse(int warehouseId)
        {
            return Ok(await warehouseProductService.GetRemainingCapacityByWarehouseId(warehouseId));
        }
    }
}