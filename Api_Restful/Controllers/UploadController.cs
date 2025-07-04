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
        [Authorize(Roles = "Administrador")] // Solo usuarios con el rol "Administrador"

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

                    var nombreFinal = provider.FormData["nombreFinal"];

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

        [Authorize(Roles = "Administrador")] // Solo usuarios con el rol "Administrador"

        [HttpDelete]
        [Route("eliminarimagen")]
        public IHttpActionResult EliminarImagen()
        {
            try
            {
                var imageUrl = HttpContext.Current.Request.QueryString["imageUrl"];
                if (string.IsNullOrWhiteSpace(imageUrl))
                    return BadRequest("URL no proporcionada.");

                // Validar que sea una ruta de /uploads/
                if (!imageUrl.StartsWith("/uploads/", StringComparison.OrdinalIgnoreCase))
                    return BadRequest("La imagen debe estar en /uploads/.");

                // Convertir a ruta física
                var physicalPath = HttpContext.Current.Server.MapPath("~" + imageUrl.Replace("/", "\\"));

                // Debug (revisa la ventana "Output" en Visual Studio)
                System.Diagnostics.Debug.WriteLine($"Eliminando: {physicalPath}");

                if (File.Exists(physicalPath))
                {
                    File.Delete(physicalPath);
                    return Ok(new { message = "Imagen eliminada." });
                }

                return NotFound();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


    }
}

