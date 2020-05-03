using GestionArticulos.Core.Domain;
using GestionArticulos.Repository.Abstract;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GestionArticulos.Services.Abstract
{
    public interface INeighborhoodService : IBaseService<Neighborhood, INeighborhoodRepository>
    {
        public Task<List<Neighborhood>> GetByMunicipalityId(int municipalityId);
    }
}
