using GestionArticulos.Core.Domain;
using GestionArticulos.Core.ViewModels;
using GestionArticulos.Repository.Abstract;
using GestionArticulos.Services.Abstract;
using GestionArticulos.Services.Framework;
using System.Threading.Tasks;

namespace GestionArticulos.Services.Implementations
{
    public class WarehouseProductService : BaseService<WarehouseProduct, IWarehouseProductRepository>, IWarehouseProductService
    {
        private readonly IWarehouseProductRepository warehouseProductRepository;
        public WarehouseProductService(IWarehouseProductRepository warehouseProductRepository) : base(warehouseProductRepository) => this.warehouseProductRepository = warehouseProductRepository;
        public Task<int> AddProduct(int warehouseId, int productId, int count) => warehouseProductRepository.AddProduct(warehouseId, productId, count);
        public Task<int> RemoveProduct(int warehouseId, int productId, int count) => warehouseProductRepository.RemoveProduct(warehouseId, productId, count);
        public async Task<WarehouseProductViewModel> GetByWarehouseId(int warehouseId) => await warehouseProductRepository.GetByWarehouseId(warehouseId);
        protected override TaskResult<WarehouseProduct> ValidateOnCreate(WarehouseProduct warehouseProduct) => new TaskResult<WarehouseProduct>();
        protected override TaskResult<WarehouseProduct> ValidateOnDelete(WarehouseProduct warehouseProduct) => new TaskResult<WarehouseProduct>();
        protected override TaskResult<WarehouseProduct> ValidateOnUpdate(WarehouseProduct warehouseProduct) => new TaskResult<WarehouseProduct>();
        public Task<int> GetRemainingCapacityByWarehouseId(int warehouseId) => warehouseProductRepository.GetRemainingCapacityByWarehouseId(warehouseId);

        public Task<int> GetProductCountByWarehouse(int warehouseId, int productId) => warehouseProductRepository.GetProductCountByWarehouse(warehouseId, productId);
    }
}
