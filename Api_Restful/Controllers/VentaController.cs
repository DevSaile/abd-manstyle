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
    [RoutePrefix("api/ventas")]

    public class VentaController : ApiController
    {

        private readonly VentaFacturaMCN MetodosVenta = new VentaFacturaMCN();

        // Registrar una nueva venta
        [Authorize] // Solo usuarios autenticados pueden acceder

        [HttpPost]
        [Route("agregar")]
        public IHttpActionResult AgregarVenta([FromBody] Venta_FacturaDTO nuevaVenta)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState); // Devuelve un error 400 si el modelo es inválido

            int resultado = MetodosVenta.AgregarVentaPRO(nuevaVenta);

            if (resultado == -1)
                return InternalServerError(new Exception("Error al registrar la venta.")); // Error 500

            return Ok(new { mensaje = "Venta registrada correctamente.", ID_Venta = resultado }); // Respuesta exitosa
        }

        [Authorize(Roles = "Administrador")] // Solo usuarios con el rol "Administrador"

        [HttpGet]
        [Route("todas")]
        public IHttpActionResult ObtenerTodasLasVentas()
        {
            var ventas = MetodosVenta.ObtenerVentasAgrupadas();

            if (ventas == null || !ventas.Any())
                return NotFound();

            return Ok(ventas);
        }

    }

}
