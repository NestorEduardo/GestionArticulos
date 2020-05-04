﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GestionArticulos.Core.Domain;
using GestionArticulos.Services.Abstract;
using GestionArticulos.Services.Framework;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Newtonsoft.Json;

namespace GestionArticulos.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WarehouseController : Controller
    {
        private readonly IWarehouseService warehouseService;
        public WarehouseController(IWarehouseService warehouseService) => this.warehouseService = warehouseService;

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll() => Ok(await warehouseService.GetAll());

        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetAll(int id) => Ok(await warehouseService.GetById(id));

        [HttpPost("Add")]
        public IActionResult Add([FromBody] Warehouse warehouse)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                return Ok(warehouseService.Create(warehouse));
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
        public IActionResult Update([FromBody] Warehouse warehouse)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                return Ok(warehouseService.Update(warehouse, warehouse.Id));
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