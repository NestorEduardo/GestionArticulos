using GestionArticulos.Core.Domain;
using GestionArticulos.Repository.Abstract;
using GestionArticulos.Services.Abstract;
using GestionArticulos.Services.Framework;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GestionArticulos.Services.Implementations
{
    public class NeighborhoodService : BaseService<Neighborhood, INeighborhoodRepository>, INeighborhoodService
    {
        private readonly INeighborhoodRepository neighborhoodRepository;
        public NeighborhoodService(INeighborhoodRepository neighborhoodRepository) : base(neighborhoodRepository) => this.neighborhoodRepository = neighborhoodRepository;
        public async Task<List<Neighborhood>> GetByMunicipalityId(int municipalityId) => await neighborhoodRepository.GetByMunicipalityId(municipalityId);
        protected override TaskResult<Neighborhood> ValidateOnCreate(Neighborhood neighborhood) => new TaskResult<Neighborhood>();
        protected override TaskResult<Neighborhood> ValidateOnDelete(Neighborhood neighborhood) => new TaskResult<Neighborhood>();
        protected override TaskResult<Neighborhood> ValidateOnUpdate(Neighborhood neighborhood) => new TaskResult<Neighborhood>();
    }
}
