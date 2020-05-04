using System;
using System.Threading.Tasks;
using GestionArticulos.Core.Domain;
using GestionArticulos.Services.Abstract;
using Microsoft.AspNetCore.Mvc;

namespace GestionArticulos.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : Controller
    {
        private readonly ICategoryService categoryService;
        public CategoryController(ICategoryService categoryService) => this.categoryService = categoryService;

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll() => Ok(await categoryService.GetAll());

        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetAll(int id) => Ok(await categoryService.GetById(id));

        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody] Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                return Ok(await categoryService.Create(category));
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Error = ex.Message
                });
            }
        }

        [HttpPost("Update")]
        public async Task<IActionResult> Update([FromBody] Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                return Ok(await categoryService.Update(category, category.Id));
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Error = ex.Message
                });
            }
        }

        [HttpPost("Delete")]
        public async Task<IActionResult> Delete([FromBody] Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                return Ok(await categoryService.Delete(category.Id));
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