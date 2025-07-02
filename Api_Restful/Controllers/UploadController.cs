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
                return Request.CreateErrorResponse(HttpStatusCode.UnsupportedMediaType, "Tipo de contenido no soportado");

            try
            {
                var root = HttpContext.Current.Server.MapPath("~/uploads");
                Directory.CreateDirectory(root);

                var provider = new MultipartFormDataStreamProvider(root);
                await Request.Content.ReadAsMultipartAsync(provider);

                foreach (var file in provider.FileData)
                {
                    var localFileName = file.LocalFileName;
                    var originalFileName = file.Headers.ContentDisposition.FileName.Trim('\"');
                    var extension = Path.GetExtension(originalFileName);

                    var nombreFinal = provider.FormData["nombreFinal"]; // 👈

                    var safeName = !string.IsNullOrEmpty(nombreFinal)
                        ? Path.GetFileNameWithoutExtension(nombreFinal).Replace(" ", "_") + extension
                        : Path.GetFileNameWithoutExtension(originalFileName).Replace(" ", "_") + "_" + Guid.NewGuid() + extension;

                    var newFilePath = Path.Combine(root, safeName);
                    File.Move(localFileName, newFilePath);

                    var fileUrl = $"{Request.RequestUri.GetLeftPart(UriPartial.Authority)}/uploads/{safeName}";
                    return Request.CreateResponse(HttpStatusCode.OK, new { url = fileUrl });
                }

                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "No se recibió archivo");
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }


        [HttpDelete]
        [Route("eliminarimagen")]
        public IHttpActionResult EliminarImagen([FromUri] string imageUrl)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(imageUrl))
                    return BadRequest("URL inválida");

                // Obtener la ruta física
                var serverBase = Request.RequestUri.GetLeftPart(UriPartial.Authority);
                var relativePath = imageUrl.Replace(serverBase, "").Replace("/", "\\");

                var filePath = HttpContext.Current.Server.MapPath("~" + relativePath);

                if (!File.Exists(filePath))
                    return NotFound();

                File.Delete(filePath);

                return Ok(new { mensaje = "Imagen eliminada correctamente" });
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }
}

