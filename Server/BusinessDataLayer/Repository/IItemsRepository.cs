using ItemsStore.Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ItemsStore.Server.Repository
{
    /// <summary>
    /// interface of controller actions -CRUD
    /// </summary>
    public interface IItemsRepository
    {
        Task<IList<ItemEntity>>  GetAll();
        Task<ItemEntity> GetById(int? id);
        Task<ItemEntity> Create(ItemEntityFile item);
        Task<ItemEntity> Update(ItemEntityFile item);
        Task<DeleteEntity> DeleteItem(int? id);  
    }
}
