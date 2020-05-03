using GestionArticulos.Core.Domain;
using GestionArticulos.Repository.Abstract;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GestionArticulos.Services.Abstract
{
    public interface IMunicipalityService : IBaseService<Municipality, IMunicipalityRepository>
    {
        public Task<List<Municipality>> GetByProvinceId(int provinceId);
    }
}
