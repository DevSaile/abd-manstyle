using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using System.Threading.Tasks;
using System.Web;



namespace WebManStyle_ABD.Controllers
{
    [RoutePrefix("api/upload")] 

    public class UploadController : ApiController
    {
        [HttpPost]
        [Route("uploadimagen")]
        public async Task<HttpResponseMessage> UploadImagen()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                return Request.CreateErrorResponse(HttpStatusCode.UnsupportedMediaType, "Tipo de contenido no soportado");
            }

            try
            {
                var root = HttpContext.Current.Server.MapPath("~/uploads"); 
                Directory.CreateDirectory(root);

                var provider = new MultipartFormDataStreamProvider(root);
                await Request.Content.ReadAsMultipartAsync(provider);

                foreach (var file in provider.FileData)
                {
                    var localFileName = file.LocalFileName;
                    var fileName = Path.GetFileNameWithoutExtension(file.Headers.ContentDisposition.FileName.Trim('\"'));
                    var extension = Path.GetExtension(file.Headers.ContentDisposition.FileName.Trim('\"'));

                    fileName = fileName.Replace(" ", "_").Replace(":", "").Replace(".", "").Replace("á", "a");

                    fileName = $"{fileName}_{Guid.NewGuid()}{extension}";

                    var newFilePath = Path.Combine(root, fileName);
                    File.Move(localFileName, newFilePath);

                    var fileUrl = $"{Request.RequestUri.GetLeftPart(UriPartial.Authority)}/uploads/{fileName}";

                    return Request.CreateResponse(HttpStatusCode.OK, new { url = fileUrl });
                }

                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "No se recibió archivo");
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }
    }
}

