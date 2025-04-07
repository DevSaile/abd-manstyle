using BLL;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebManStyle_ABD.Controllers
{

    [RoutePrefix("api/Sucursales")] // Ruta base para este controlador

    public class SucursalController : ApiController
    {

        // Instancia de tu clase de negocio (como lo haces en tu capa de presentación)
        private readonly ProductoMCN MetodosProducto = new ProductoMCN();
        private readonly SucursalMCN MetodosSucursal = new SucursalMCN();


        // Obtener la lista de productos activos
        [HttpGet]
        [Route("")]
        public IHttpActionResult ObtenerSucursales()
        {
            var Sucursales = MetodosSucursal.ObtenerSucursales();
            if (Sucursales == null || Sucursales.Count == 0)
                return NotFound();

            return Ok(Sucursales);
        }


    }
}
