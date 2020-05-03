using GestionArticulos.Core.Domain;
using GestionArticulos.Repository.Abstract;
using GestionArticulos.Repository.Implementations;
using GestionArticulos.Services.Abstract;
using GestionArticulos.Services.Framework;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GestionArticulos.Services.Implementations
{
    public class MunicipalityService : BaseService<Municipality, IMunicipalityRepository>, IMunicipalityService
    {
        private readonly IMunicipalityRepository municipalityRepository;
        public MunicipalityService(IMunicipalityRepository municipalityRepository) : base(municipalityRepository)
        {
            this.municipalityRepository = municipalityRepository;
        }
        public async Task<List<Municipality>> GetByProvinceId(int provinceId) => await municipalityRepository.GetByProvinceId(provinceId);
        protected override TaskResult<Municipality> ValidateOnCreate(Municipality municipality) => new TaskResult<Municipality>();
        protected override TaskResult<Municipality> ValidateOnDelete(Municipality municipality) => new TaskResult<Municipality>();
        protected override TaskResult<Municipality> ValidateOnUpdate(Municipality municipality) => new TaskResult<Municipality>();
    }
}
