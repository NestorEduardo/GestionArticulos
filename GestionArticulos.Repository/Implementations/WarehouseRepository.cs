using GestionArticulos.Core.Domain;
using GestionArticulos.Repository.Abstract;
using GestionArticulosData;

namespace GestionArticulos.Repository.Implementations
{
    public class WarehouseRepository : BaseRepository<Warehouse>, IWarehouseRepository
    {
        public WarehouseRepository(ApplicationDbContext database) : base(database) { }
    }
}
