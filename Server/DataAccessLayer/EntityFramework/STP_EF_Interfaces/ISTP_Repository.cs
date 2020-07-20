using System.Collections.Generic;
using System.Data.Common;
using System.Threading.Tasks;

namespace ItemsStore.Repositories
{
    public interface ISTP_Repository
    {
        DbCommand GetStoredProcedure(string name, params (string, object)[] nameValueParams);

        DbCommand GetStoredProcedure(string name);
        DbCommand RunStoredProcedure(string name, params (string, object)[] nameValueParams);

        DbCommand RunStoredProcedure(string name);

    }

    public interface ISTP_Repository<TEntity> : ISTP_Repository
    {
        IList<TEntity> ExecuteStoredProcedure(DbCommand command);

        Task<IList<TEntity>> ExecuteStoredProcedureAsync(DbCommand command);
    }
}