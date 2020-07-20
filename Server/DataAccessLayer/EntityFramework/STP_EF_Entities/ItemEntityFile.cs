using Microsoft.AspNetCore.Http;
using System;

namespace ItemsStore.Repositories.Entities
{
    public class ItemEntityFile:ItemEntity
    {
        public IFormFile File { get; set; }
    } 
}
