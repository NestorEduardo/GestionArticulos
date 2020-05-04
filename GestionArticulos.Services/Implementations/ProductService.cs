using GestionArticulos.Core.Domain;
using GestionArticulos.Repository.Abstract;
using GestionArticulos.Services.Abstract;
using GestionArticulos.Services.Framework;

namespace GestionArticulos.Services.Implementations
{
    public class ProductService : BaseService<Product, IProductRepository>, IProductService
    {
        public ProductService(IProductRepository productRepository) : base(productRepository) { }
        protected override TaskResult<Product> ValidateOnCreate(Product product) => new TaskResult<Product>();
        protected override TaskResult<Product> ValidateOnDelete(Product product) => new TaskResult<Product>();
        protected override TaskResult<Product> ValidateOnUpdate(Product product) => new TaskResult<Product>();
    }
}
