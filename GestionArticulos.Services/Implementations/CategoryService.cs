using GestionArticulos.Core.Domain;
using GestionArticulos.Repository.Abstract;
using GestionArticulos.Services.Abstract;
using GestionArticulos.Services.Framework;

namespace GestionArticulos.Services.Implementations
{
    public class CategoryService : BaseService<Category, ICategoryRepository>, ICategoryService
    {
        public CategoryService(ICategoryRepository categoryRepository) : base(categoryRepository) { }
        protected override TaskResult<Category> ValidateOnCreate(Category category) => new TaskResult<Category>();
        protected override TaskResult<Category> ValidateOnDelete(Category category) => new TaskResult<Category>();
        protected override TaskResult<Category> ValidateOnUpdate(Category category) => new TaskResult<Category>();
    }
}
