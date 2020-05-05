using GestionArticulos.Core.Domain;
using GestionArticulos.Core.ViewModels;
using GestionArticulos.Repository.Abstract;
using System.Threading.Tasks;

namespace GestionArticulos.Services.Abstract
{
    public interface IWarehouseProductService : IBaseService<WarehouseProduct, IWarehouseProductRepository>
    {
       public Task<WarehouseProductViewModel> GetByWarehouseId(int warehouseId);
        public Task<int> AddProduct(int warehouseId, int productId, int count);
        public Task<int> RemoveProduct(int warehouseId, int productId, int count);
    }
}
