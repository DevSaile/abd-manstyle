using BLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebManStyle_ABD.Controllers
{

    [RoutePrefix("api/clientes")]
    public class ClienteController : ApiController
    {

        private readonly ClienteMCN MetodosCliente = new ClienteMCN();

        // Obtener clientes activos
        [HttpGet]
        [Route("activos")]
        public IHttpActionResult ObtenerClientesActivos()
        {
            var clientes = MetodosCliente.ObtenerClientesActivos();

            if (clientes == null || clientes.Count == 0)
                return NotFound(); // Devuelve un 404 si no hay clientes activos

            return Ok(clientes); // Devuelve la lista de clientes activos
        }
    }
}
