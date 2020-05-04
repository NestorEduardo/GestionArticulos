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
        TaskResult<T> Create(T entity);
        TaskResult<T> Update(T entity, int id);
        TaskResult Delete(T entity);
    }
}
