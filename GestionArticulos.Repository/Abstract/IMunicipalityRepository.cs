using GestionArticulos.Core.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GestionArticulos.Repository.Abstract
{
    public interface IMunicipalityRepository : IBaseRepository<Municipality>
    {
        Task<List<Municipality>> GetByProvinceId(int provinceId);
    }
}
