using GestionArticulos.Core.Domain;
using GestionArticulos.Repository.Abstract;
using System.Collections.Generic;
using GestionArticulos.Services.Framework;

namespace GestionArticulos.Services.Abstract
{
    public interface IBaseService<T, U> where T : BaseEntity where U : IBaseRepository<T>
    {
        List<T> GetAll();
        TaskResult<T> Create(T entity);
        TaskResult<T> Update(T entity);
        TaskResult Delete(T entity);
    }
}
