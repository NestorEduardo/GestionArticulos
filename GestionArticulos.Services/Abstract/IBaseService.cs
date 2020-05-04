using GestionArticulos.Core.Domain;
using GestionArticulos.Repository.Abstract;
using System.Collections.Generic;
using GestionArticulos.Services.Framework;
using System.Threading.Tasks;

namespace GestionArticulos.Services.Abstract
{
    public interface IBaseService<T, U> where T : BaseEntity where U : IBaseRepository<T>
    {
        Task<List<T>> GetAll();
        Task<T> GetById(int id);
        public Task<int> Create(T entity);
        public Task<int> Update(T entity, int id);
        public Task<int> Delete(int id);
    }
}
