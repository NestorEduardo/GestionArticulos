using GestionArticulos.Core.Domain;
using GestionArticulos.Core.ViewModels;
using GestionArticulos.Repository.Implementations;
using GestionArticulos.Repository.Infrastructure;
using GestionArticulosData;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace GestionArticulos.Repository.Abstract
{
    public class WarehouseProductRepository : BaseRepository<WarehouseProduct>, IWarehouseProductRepository
    {
        private readonly IWarehouseRepository warehouseRepository;
        private readonly IMovementRepository movementRepository;
        public WarehouseProductRepository(ApplicationDbContext database, IWarehouseRepository warehouseRepository, IMovementRepository movementRepository) : base(database)
        {
            this.warehouseRepository = warehouseRepository;
            this.movementRepository = movementRepository;
        }
        public async Task<WarehouseProductViewModel> GetByWarehouseId(int warehouseId)
        {
            WarehouseProductViewModel warehouseProductViewModel = new WarehouseProductViewModel();
            IQueryable<WarehouseProduct> query = Database.Set<WarehouseProduct>().Where(wp => wp.IsActive && wp.WarehouseId == warehouseId).AsQueryable();
            Func<IQueryable<WarehouseProduct>, IQueryable<WarehouseProduct>> includes = DbContextHelper.GetNavigations<WarehouseProduct>();
            query = includes(query);
            warehouseProductViewModel.WarehouseProducts = await query.ToListAsync();

            if (warehouseProductViewModel.WarehouseProducts.Count > 0)
            {
                warehouseProductViewModel.UsedCapacity = query.GroupBy(o => o.WarehouseId).Select(g => new { key = g.Key, total = g.Sum(i => i.Count) }).FirstOrDefault().total;
            }

            return warehouseProductViewModel;
        }
        public async Task<int> AddProduct(int warehouseId, int productId, int count)
        {
            WarehouseProduct warehouseProduct = Database.WarehouseProducts.Where(wp => wp.WarehouseId == warehouseId && wp.ProductId == productId).FirstOrDefault();

            if (warehouseProduct == null)
            {
                warehouseProduct = new WarehouseProduct()
                {
                    Count = count,
                    WarehouseId = warehouseId,
                    ProductId = productId,
                };

                Database.WarehouseProducts.Add(warehouseProduct);
            }
            else
            {
                warehouseProduct.Count += count;
                Database.Entry(warehouseProduct).State = EntityState.Modified;
            }

            await movementRepository.AddMovement("ENTRADA", new Movement()
            {
                ProductId = warehouseProduct.ProductId,
                WarehouseId = warehouseProduct.WarehouseId,
                Count = count
            });

            return await Database.SaveChangesAsync();
        }
        public async Task<int> RemoveProduct(int warehouseId, int productId, int count)
        {
            WarehouseProduct warehouseProduct = Database.WarehouseProducts.Where(wp => wp.WarehouseId == warehouseId && wp.ProductId == productId).FirstOrDefault();
            warehouseProduct.Count -= count;
            Database.Entry(warehouseProduct).State = EntityState.Modified;

            await movementRepository.AddMovement("SALIDA", new Movement()
            {
                ProductId = warehouseProduct.ProductId,
                WarehouseId = warehouseProduct.WarehouseId,
                Count = count
            });

            return await Database.SaveChangesAsync();
        }
        public async Task<int> GetRemainingCapacityByWarehouseId(int warehouseId)
        {
            Warehouse warehouse = await warehouseRepository.GetById(warehouseId);
            WarehouseProductViewModel warehouseProductViewModel = new WarehouseProductViewModel();
            IQueryable<WarehouseProduct> query = Database.Set<WarehouseProduct>().Where(wp => wp.IsActive && wp.WarehouseId == warehouseId).AsQueryable();

            warehouseProductViewModel.WarehouseProducts = await query.ToListAsync();

            if (warehouseProductViewModel.WarehouseProducts.Count > 0)
            {
                warehouseProductViewModel.UsedCapacity = query.GroupBy(o => o.WarehouseId).Select(g => new { key = g.Key, total = g.Sum(i => i.Count) }).FirstOrDefault().total;
            }

            int remainingCapacity = warehouse.Capacity - warehouseProductViewModel.UsedCapacity;
            return remainingCapacity;
        }

        public async Task<int> GetProductCountByWarehouse(int warehouseId, int productId)
        {
            WarehouseProduct warehouseProduct = await Database.Set<WarehouseProduct>().Where(wp => wp.IsActive && wp.WarehouseId == warehouseId && wp.ProductId == productId).AsQueryable().FirstOrDefaultAsync();
            int count = 0;

            if (warehouseProduct != null)
            {
                count = warehouseProduct.Count;
            }

            return count;
        }
    }
}


