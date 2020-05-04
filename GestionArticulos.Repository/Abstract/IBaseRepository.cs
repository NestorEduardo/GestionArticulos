using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace GestionArticulos.Repository.Abstract
{
    public interface IBaseRepository<T> where T : class
    {
        Task<int> CommitChanges();
        Task<T> GetById(int id);
        Task<List<T>> GetAll();
        IQueryable<T> Get(Expression<Func<T, bool>> where, string includeProperties = "");
        IQueryable<T> Get(Expression<Func<T, bool>> where, params Expression<Func<T, object>>[] include);
        IQueryable<T> Get(params Expression<Func<T, object>>[] include);
        Task<int> Insert(T entity);
        T Update(T entity);
        Task<int> Update(T entity, int id);
        void SoftDelete(int id);
        int Count();
    }
}
