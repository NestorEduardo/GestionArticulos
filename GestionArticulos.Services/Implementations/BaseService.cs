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
        public TaskResult<T> Create(T entity)
        {
            TaskResult<T> taskResult = ValidateOnCreate(entity);

            if (taskResult.Success)
            {
                try
                {
                    repository.Insert(entity);
                    repository.CommitChanges();
                    taskResult.AddMessage("Row added successfully.");
                }
                catch (Exception ex)
                {
                    taskResult.AddErrorMessage(ex.Message);
                }
            }

            return taskResult;
        }
        public TaskResult<T> Update(T entity)
        {
            TaskResult<T> taskResult = ValidateOnUpdate(entity);

            if (taskResult.Success)
            {
                try
                {
                    repository.Update(entity);
                    repository.CommitChanges();
                    taskResult.AddMessage("Row updated successfully.");
                    taskResult.Data = entity;
                }
                catch (Exception ex)
                {
                    taskResult.AddErrorMessage(ex.Message);
                }
            }

            return taskResult;
        }
        public TaskResult Delete(T entity)
        {
            TaskResult<T> taskResult = ValidateOnDelete(entity);

            if (taskResult.Success)
            {
                try
                {
                    repository.SoftDelete(entity.Id);
                    repository.CommitChanges();
                    taskResult.AddMessage("Row deleted successfully.");
                    taskResult.Data = entity;
                }
                catch (Exception ex)
                {
                    taskResult.AddErrorMessage(ex.Message);
                }
            }

            return taskResult;
        }
        public virtual async Task<List<T>> GetAll() => await repository.GetAll();
        public T GetById(int id) => repository.GetById(id);
    }
}
