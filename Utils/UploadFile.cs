using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;

namespace ItemsStore.Utils
{


    /// <summary>
    /// upload files to url from config if not exist than to  wwwroot/images
    /// </summary>
    public class UploadFile
    {
        public static string UploadPath = "";
        private IOptions<AppSettingsModel> settings;
        public UploadFile(IOptions<AppSettingsModel> settings)
        {
              this.settings = settings;
               UploadPath = settings.Value.UploadPath;
        }
        /// <summary>
        /// uploades file to the specified place inside project
        /// the path is taken from config file 
        /// if the path is not specified than it copies to Resources/Images
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        public static string Upload(IFormFile file)
        {
            var url = ""; 
             var folderName = (String.IsNullOrEmpty(UploadPath)) ? Path.Combine("wwwroot", "images"):UploadPath;
             var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            if (file.Length > 0)
            {
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var fullPath = Path.Combine(pathToSave, fileName);
                url = Path.Combine(folderName, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                return url.Replace("wwwroot","");
            }
            else
            {
                return url;
            }


        }
    }
}
