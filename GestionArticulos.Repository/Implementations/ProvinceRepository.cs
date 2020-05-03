using GestionArticulos.Core.Domain;
using GestionArticulos.Repository.Abstract;
using GestionArticulosData;

namespace GestionArticulos.Repository.Implementations
{
    public class ProvinceRepository : BaseRepository<Province>, IProvinceRepository
    {
        public ProvinceRepository(ApplicationDbContext database) : base(database) { }
    }
}
