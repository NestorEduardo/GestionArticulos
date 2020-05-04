using GestionArticulos.Core.Domain;
using GestionArticulos.Repository.Abstract;
using GestionArticulosData;

namespace GestionArticulos.Repository.Implementations
{
    public class CategoryRepository : BaseRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(ApplicationDbContext database) : base(database) { }
    }
}
