using GestionArticulos.Core.Domain;
using GestionArticulos.Repository.Abstract;
using GestionArticulos.Services.Abstract;
using GestionArticulos.Services.Framework;

namespace GestionArticulos.Services.Implementations
{
    public class ProvinceService : BaseService<Province, IProvinceRepository>, IProvinceService
    {
        public ProvinceService(IProvinceRepository provinceRepository) : base(provinceRepository) { }
        protected override TaskResult<Province> ValidateOnCreate(Province province) => new TaskResult<Province>();
        protected override TaskResult<Province> ValidateOnDelete(Province province) => new TaskResult<Province>();
        protected override TaskResult<Province> ValidateOnUpdate(Province province) => new TaskResult<Province>();
    }
}
