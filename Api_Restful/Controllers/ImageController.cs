using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;

namespace WebManStyle_ABD.Controllers
{
    [RoutePrefix("api/imagen")] // Ruta base para este controlador

    public class ImageController : ApiController
    {

        [HttpGet]
        [Route("{nombreArchivo}")]
        public HttpResponseMessage ObtenerImagen(string nombreArchivo)
        {
            var ruta = HttpContext.Current.Server.MapPath("~/uploads/" + nombreArchivo);
            System.Diagnostics.Debug.WriteLine("Ruta completa: " + ruta);

            if (!File.Exists(ruta))
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            var contenido = new ByteArrayContent(File.ReadAllBytes(ruta));
            string tipoMime = MimeMapping.GetMimeMapping(ruta);
            contenido.Headers.ContentType = new MediaTypeHeaderValue(tipoMime);

            var respuesta = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = contenido
            };

            return respuesta;
        }
    }
}
