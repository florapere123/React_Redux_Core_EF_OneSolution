using Microsoft.AspNetCore.Http;
using System;

namespace ItemsStore.Repositories.Entities
{
    public class ItemEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime SaleStartDate { get; set; }
        public int ImageId { get; set; }
      
        public string ImageUrl { get; set; }
       
    } 
}
