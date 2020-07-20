using ItemsStore.EntityModels;
using ItemsStore.Repositories;
using ItemsStore.Repositories.Entities;
using ItemsStore.Repository.Extensions;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ItemsStore.Server.Repository
{
    public class ItemsRepository : IItemsRepository
    {
        private readonly ISTP_Repository _repository;


      
        public ItemsRepository(ISTP_Repository repository )
        {
           this._repository = repository;
        }
        /// <summary>
        /// creates new item with data
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        public async Task<ItemEntity> Create(ItemEntityFile item)
        {
            using (var db = new ItemDBContext())
            {
                string Name = item.Name;
                string Description = item.Description;
                DateTime SaleStartDate = item.SaleStartDate;
                string ImageUrl = item.ImageUrl;
                var res = await _repository
                            .GetStoredProcedure("[dbo].[CreateItem]")
                            .WithSqlParams(
                            (nameof(Name), Name),
                            (nameof(Description), Description),
                            (nameof(SaleStartDate), SaleStartDate),
                             (nameof(ImageUrl), ImageUrl))
                            .ExecuteStoredProcedureAsync<ItemEntity>();

                return res.FirstOrDefault();
            
            }

        }
        /// <summary>
        /// updates data by id if image url is empty that it keeps the previous one
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public async Task<ItemEntity> Update(ItemEntityFile item)
        {
            using (var db = new ItemDBContext())
            {
                int Id = item.Id;
                string Name = item.Name;
                string Description = item.Description;
                DateTime SaleStartDate = item.SaleStartDate;
                string ImageUrl = item.ImageUrl;
                var res = await _repository
                            .GetStoredProcedure("[dbo].[UpdateItem]")
                            .WithSqlParams(
                            (nameof(Id), Id),
                            (nameof(Name), Name),
                            (nameof(Description), Description),
                            (nameof(SaleStartDate), SaleStartDate),
                             (nameof(ImageUrl), ImageUrl))
                            .ExecuteStoredProcedureAsync<ItemEntity>();

                return res.FirstOrDefault();
              
            }

        }
        /// <summary>
        /// gets all items
        /// </summary>
        /// <returns></returns>
        public async Task<IList<ItemEntity>> GetAll()
        {
            var res = _repository
           .GetStoredProcedure("[dbo].[GetItems]")
           .ExecuteStoredProcedureAsync<ItemEntity>();
            return await res;
        }
        /// <summary>
        /// gets specified item by id -calls to stp that if id not specified gets all items
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ItemEntity> GetById(int? id)
        {
           id = (id != 0) ? id : null;
            var idParam = new SqlParameter("@id", id);
            using (var db = new ItemDBContext())
            {
                var result =  await db.ItemEntity.FromSqlRaw("exec [dbo].[GetItems] @id", idParam).AsNoTracking().ToListAsync();
                return result.FirstOrDefault();
            }
        }
        /// <summary>
        /// deletes item by id and return object with 2 properies in one class IsDeleted,DeletedId
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<DeleteEntity> DeleteItem(int? id)
        {

            
            var res = (await _repository
           .RunStoredProcedure("[dbo].[DeleteItem]")
             .WithSqlParams((nameof(id), id))
            .ExecuteStoredProcedureAsync<DeleteEntity>());
             var obj = res.FirstOrDefault();
            return obj;
            
        }

       
    }
}
