﻿using GestionArticulos.Core.Domain;
using Microsoft.EntityFrameworkCore;

namespace GestionArticulosData
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<Province> Provinces { get; set; }
        public DbSet<Municipality> Municipalities { get; set; }
        public DbSet<Neighborhood> Neighborhoods { get; set; }
        public DbSet<Warehouse> Warehouses { get; set; }
    }
}