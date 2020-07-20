using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using ItemsStore.EntityModels;
using ItemsStore.Repository.Extensions;
using Microsoft.EntityFrameworkCore;

namespace ItemsStore.Repositories
{
    public class STP_Repository : ISTP_Repository
    {
        private readonly ItemDBContext _dbContext;

        public STP_Repository(ItemDBContext dbContext)
        {
            _dbContext = dbContext;    
        }

        public DbCommand GetStoredProcedure(string name, params (string, object)[] nameValueParams)
        {
            return _dbContext
                .LoadStoredProcedure(name)
                .WithSqlParams(nameValueParams);
        }

        public DbCommand GetStoredProcedure(string name)
        {
            return _dbContext.LoadStoredProcedure(name);
        }
        public DbCommand RunStoredProcedure(string name)
        {
            return _dbContext.LoadStoredProcedure(name);
        }
        public DbCommand RunStoredProcedure(string name, params (string, object)[] nameValueParams)
        {
            return _dbContext
                .LoadStoredProcedure(name)
                .WithSqlParams(nameValueParams);
        }

    }

    public class STP_Repository<TEntity> : STP_Repository, ISTP_Repository<TEntity> where TEntity : class
    {
        public STP_Repository(ItemDBContext dbContext) : base(dbContext)
        {
        }

        public IList<TEntity> ExecuteStoredProcedure(DbCommand command)
        {
            return command.ExecuteStoredProcedure<TEntity>();
        }

        public Task<IList<TEntity>> ExecuteStoredProcedureAsync(DbCommand command)
        {
            return command.ExecuteStoredProcedureAsync<TEntity>();
        }
    }

     
}