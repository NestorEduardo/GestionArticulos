using GestionArticulos.Core.Domain;
using GestionArticulos.Repository.Abstract;
using GestionArticulos.Services.Abstract;
using GestionArticulos.Services.Framework;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GestionArticulos.Services.Implementations
{
    public abstract class BaseService<T, U> : IBaseService<T, U> where T : BaseEntity where U : IBaseRepository<T>
    {
        protected U repository;
        public BaseService(U repository) => this.repository = repository;
        protected abstract TaskResult<T> ValidateOnCreate(T entity);
        protected abstract TaskResult<T> ValidateOnDelete(T entity);
        protected abstract TaskResult<T> ValidateOnUpdate(T entity);
        public async Task<int> Create(T entity) => await repository.Insert(entity);
        public async Task<int> Update(T entity, int id) => await repository.Update(entity, id);
        public async Task<int> Delete(int id) => await repository.SoftDelete(id);
        public virtual async Task<List<T>> GetAll() => await repository.GetAll();
        public async Task<T> GetById(int id) => await repository.GetById(id);
    }
}
