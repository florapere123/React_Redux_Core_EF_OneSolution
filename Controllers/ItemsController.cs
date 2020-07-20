using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ItemsStore.Repositories;
using ItemsStore.Repositories.Entities;
using ItemsStore.Repository.Extensions;
using Microsoft.Extensions.Logging;
using ItemsStore.Server.Repository;
using Microsoft.AspNetCore.Server.IIS.Core;
using Microsoft.AspNetCore.Http;
using ItemsStore.Utils;

namespace ItemsStore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ItemsController : ControllerBase
    {
        //  private readonly ISTP_Repository _repository;
        private readonly IItemsRepository _repository;
        private readonly ILogger<ItemsController> _logger;

        public ItemsController(IItemsRepository repository, ILogger<ItemsController> logger)
        {
            _logger = logger;

            _repository = repository;
        }

        [HttpGet]   
         [Route("")]
        public async Task<IList<ItemEntity>> Get()
        {
            var res =await  _repository.GetAll();
            return res;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ItemEntity> GetById(int? id)
        {
            var res = await _repository.GetById(id);
            return res;
        }


        [HttpPut]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ItemEntity> Update([FromForm]ItemEntityFile itemFile)
        {

            try
            {
                if (itemFile.File != null)
                {
                    string url = UploadFile.Upload(itemFile.File);
                    itemFile.ImageUrl = url;
                }
                var task = await _repository.Update(itemFile);
                return task;
               // return CreatedAtAction(nameof(GetById), new { id = task.Id }, task);
            }
            catch (Exception ex)
            {
                {
                    _logger.LogError($"Something went wrong inside Create action: {ex.Message}");
                    //return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
                    return null;
                }

            }
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ItemEntity> Create([FromForm]ItemEntityFile itemFile)
        {

            try
            {
                if (itemFile.File != null)
                {
                    string url = UploadFile.Upload(itemFile.File);
                    itemFile.ImageUrl = url;
                }
          
                var task = await _repository.Create(itemFile);
                return task;
                // return CreatedAtAction(nameof(GetById), new { id = task.Id }, task);
            }
            catch (Exception ex)
            {
                {
                    _logger.LogError($"Something went wrong inside Create action: {ex.Message}");
                    //return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
                    return null;
                }

            }
        }
        // DELETE:  Items/5
        [HttpDelete]
        [Route("{id}")]
        public async Task<DeleteEntity> Delete([FromRoute]int? id)
        {
            if (id.HasValue && id > 0)
            {
                var res = await _repository.DeleteItem(id);
                return res;
            }
            return null;    
        }

    }
}
