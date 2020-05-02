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
        int CommitChanges();
        T GetById(int id);
        Task<List<T>> GetAll();
        IQueryable<T> Get(Expression<Func<T, bool>> where, string includeProperties = "");
        IQueryable<T> Get(Expression<Func<T, bool>> where, params Expression<Func<T, object>>[] include);
        IQueryable<T> Get(params Expression<Func<T, object>>[] include);
        T Insert(T entity);
        T Update(T entity);
        T Update(T entity, int id);
        void SoftDelete(int id);
        int Count();
    }
}
