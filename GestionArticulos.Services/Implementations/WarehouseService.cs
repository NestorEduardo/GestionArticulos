using GestionArticulos.Core.Domain;
using GestionArticulos.Repository.Abstract;
using GestionArticulos.Services.Abstract;
using GestionArticulos.Services.Framework;

namespace GestionArticulos.Services.Implementations
{
    public class WarehouseService : BaseService<Warehouse, IWarehouseRepository>, IWarehouseService
    {
        public WarehouseService(IWarehouseRepository warehouseRepository) : base(warehouseRepository){}
        protected override TaskResult<Warehouse> ValidateOnCreate(Warehouse warehouse) => new TaskResult<Warehouse>();
        protected override TaskResult<Warehouse> ValidateOnDelete(Warehouse warehouse) => new TaskResult<Warehouse>();
        protected override TaskResult<Warehouse> ValidateOnUpdate(Warehouse warehouse) => new TaskResult<Warehouse>();
    }
}
