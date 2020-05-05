using GestionArticulos.Core.Domain;
using GestionArticulos.Core.ViewModels;
using System.Threading.Tasks;

namespace GestionArticulos.Repository.Abstract
{
    public interface IWarehouseProductRepository : IBaseRepository<WarehouseProduct>
    {
        public Task<WarehouseProductViewModel> GetByWarehouseId(int warehouseId);
        public Task<int> AddProduct(int warehouseId, int productId, int count);
        public Task<int> RemoveProduct(int warehouseId, int productId, int count);
    }
}
