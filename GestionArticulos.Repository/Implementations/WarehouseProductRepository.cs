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
        public WarehouseProductRepository(ApplicationDbContext database) : base(database) { }
        public async Task<WarehouseProductViewModel> GetByWarehouseId(int warehouseId)
        {
            WarehouseProductViewModel warehouseProductViewModel = new WarehouseProductViewModel();
            IQueryable<WarehouseProduct> query = Database.Set<WarehouseProduct>().Where(wp => wp.IsActive && wp.WarehouseId == warehouseId).AsQueryable();
            Func<IQueryable<WarehouseProduct>, IQueryable<WarehouseProduct>> includes = DbContextHelper.GetNavigations<WarehouseProduct>();
            query = includes(query);
            warehouseProductViewModel.WarehouseProducts = await query.ToListAsync();
            warehouseProductViewModel.UsedCapacity = query.GroupBy(o => o.WarehouseId).Select(g => new { key = g.Key, total = g.Sum(i => i.Count) }).FirstOrDefault().total;
            return warehouseProductViewModel;
        }
        public async Task<int> AddProduct(int warehouseId, int productId, int count)
        {
            WarehouseProduct warehouseProduct = Database.WarehouseProducts.Where(wp => wp.WarehouseId == warehouseId && wp.ProductId == productId).FirstOrDefault();

            if (warehouseProduct == null)
            {
                Database.WarehouseProducts.Add(new WarehouseProduct
                {
                    Count = count,
                    WarehouseId = warehouseId,
                    ProductId = productId,
                });
            }
            else
            {
                warehouseProduct.Count += count;
                Database.Entry(warehouseProduct).State = EntityState.Modified;
            }

            return await Database.SaveChangesAsync();
        }

        public async Task<int> RemoveProduct(int warehouseId, int productId, int count)
        {
            WarehouseProduct warehouseProduct = Database.WarehouseProducts.Where(wp => wp.WarehouseId == warehouseId && wp.ProductId == productId).FirstOrDefault();
            warehouseProduct.Count -= count;
            Database.Entry(warehouseProduct).State = EntityState.Modified;
            return await Database.SaveChangesAsync();
        }
    }
}


