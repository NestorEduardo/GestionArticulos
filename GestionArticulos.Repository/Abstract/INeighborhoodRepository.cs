using GestionArticulos.Core.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GestionArticulos.Repository.Abstract
{
    public interface INeighborhoodRepository : IBaseRepository<Neighborhood>
    {
        public Task<List<Neighborhood>> GetByMunicipalityId(int municipalityId);
    }
}
