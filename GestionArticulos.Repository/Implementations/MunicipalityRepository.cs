using GestionArticulos.Core.Domain;
using GestionArticulos.Repository.Abstract;
using GestionArticulosData;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GestionArticulos.Repository.Implementations
{
    public class MunicipalityRepository : BaseRepository<Municipality>, IMunicipalityRepository
    {
        public MunicipalityRepository(ApplicationDbContext database) : base(database) { }
        public async Task<List<Municipality>> GetByProvinceId(int provinceId) => await Database.Municipalities.Where(m => m.ProvinceId == provinceId).ToListAsync();
    }
}
