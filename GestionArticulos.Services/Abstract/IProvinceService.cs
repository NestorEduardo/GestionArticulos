using GestionArticulos.Core.Domain;
using GestionArticulos.Repository.Abstract;

namespace GestionArticulos.Services.Abstract
{
    public interface IProvinceService : IBaseService<Province, IProvinceRepository> { }
}
