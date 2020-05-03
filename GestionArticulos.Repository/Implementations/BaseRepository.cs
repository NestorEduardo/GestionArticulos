using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using GestionArticulos.Core.Domain;
using GestionArticulos.Repository.Abstract;
using GestionArticulos.Repository.Infrastructure;
using GestionArticulosData;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace GestionArticulos.Repository.Implementations
{
    public class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
    {
        protected readonly ApplicationDbContext Database;
        protected DbSet<T> DbSet => Database.Set<T>();
        protected BaseRepository(ApplicationDbContext database) => Database = database;
        public async Task<int> CommitChanges() => await Database.SaveChangesAsync();
        public int Count() => Database.Set<T>().Count();
        public IQueryable<T> Get(Expression<Func<T, bool>> where, string includeProperties = "")
        {
            IQueryable<T> query = Database.Set<T>().AsQueryable();

            foreach (string includeProperty in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            if (where != null)
            {
                query = query.Where(where);
            }

            return query;
        }
        public IQueryable<T> Get(Expression<Func<T, bool>> where, params Expression<Func<T, object>>[] include)
        {
            IQueryable<T> query = Database.Set<T>().AsQueryable();

            foreach (Expression<Func<T, object>> includeProperty in include)
            {
                query = query.Include(includeProperty);
            }

            if (where != null)
            {
                query = query.Where(where);
            }

            return query;
        }
        public IQueryable<T> Get(params Expression<Func<T, object>>[] include)
        {
            IQueryable<T> query = Database.Set<T>().AsQueryable();

            foreach (Expression<Func<T, object>> includeProperty in include)
            {
                query = query.Include(includeProperty);
            }

            return query;
        }
        public T GetById(int id) => DbSet.Find(id);
        public async Task<int> Insert(T entity)
        {
            Database.Set<T>().Add(entity);
            return await CommitChanges();
        }
        public void SoftDelete(int id)
        {
            T entity = GetById(id);

            if (entity == null)
            {
                throw new Exception("This object does not exist.");
            }

            entity.DeletedAt = DateTime.UtcNow;
            entity.IsActive = false;
            Update(entity);
        }
        public T Update(T entity)
        {
            Database.Set<T>().Attach(entity);
            Database.Entry(entity).State = EntityState.Modified;
            return entity;
        }
        public T Update(T entity, int id)
        {
            EntityEntry<T> entry = Database.Entry(entity);

            if (entry.State == EntityState.Detached)
            {
                var attachedEntity = Database.Set<T>().Find(id);

                if (attachedEntity != null)
                {
                    entity.CreatedAt = attachedEntity.CreatedAt;
                    entity.Id = attachedEntity.Id;

                    EntityEntry<T> attachedEntry = Database.Entry(attachedEntity);
                    attachedEntry.CurrentValues.SetValues(entity);
                }
                else
                {
                    entry.State = EntityState.Modified;
                }
            }

            return entity;
        }

        public async Task<List<T>> GetAll()
        {
            IQueryable<T> query = Database.Set<T>().AsQueryable();
            Func<IQueryable<T>, IQueryable<T>> includes = DbContextHelper.GetNavigations<T>();
            query = includes(query);
            return await query.ToListAsync();
        }
    }
}