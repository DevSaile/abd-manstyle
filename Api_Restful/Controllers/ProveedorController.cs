using BLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebManStyle_ABD.Controllers
{

    [RoutePrefix("api/proveedores")] // Ruta base para este controlador

    public class ProveedorController : ApiController
    {
        private readonly ProveedorMCN MetodosProveedor = new ProveedorMCN();

        // Obtener proveedores activos
        [HttpGet]
        [Route("activos")]
        public IHttpActionResult ObtenerCategoriasActivas()
        {
            var proveedores = MetodosProveedor.ObtenerProveedoresActivos();
            if (proveedores == null || proveedores.Count == 0)
                return NotFound();

            return Ok(proveedores);
        }

    }
}
