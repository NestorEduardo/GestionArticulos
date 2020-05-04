using GestionArticulos.Core.Domain;
using GestionArticulos.Repository.Abstract;

namespace GestionArticulos.Services.Abstract
{
    public interface ICategoryService : IBaseService<Category, ICategoryRepository> { }
}
