using GestionArticulos.Core.Domain;
using GestionArticulos.Repository.Abstract;
using GestionArticulosData;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GestionArticulos.Repository.Implementations
{
    public class NeighborhoodRepository : BaseRepository<Neighborhood>, INeighborhoodRepository
    {
        public NeighborhoodRepository(ApplicationDbContext database) : base(database) { }
        public async Task<List<Neighborhood>> GetByMunicipalityId(int municipalityId) => await Database.Neighborhoods.Where(n => n.MunicipalityId == municipalityId).ToListAsync();
    }
}
