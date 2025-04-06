using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLL;
using Models;

namespace WebManStyle_ABD.Controllers
{

    [RoutePrefix("api/compra_entrada")]

    public class CompraEntradaController : ApiController
    {

        private readonly Compra_EntradaMCN MetodosCompraEntrada = new Compra_EntradaMCN();

        // Agregar una nueva compra de producto
        [HttpPost]
        [Route("")]
        public IHttpActionResult AgregarCompraProducto([FromBody] Compra_EntradaDTO nuevaCompra)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var resultado = MetodosCompraEntrada.AgregarProducto(nuevaCompra);
            if (!resultado)
                return InternalServerError(new Exception("Error al registrar la compra."));

            return Ok("Compra registrada correctamente.");
        }

        // Obtener el registro completo de compras
        [HttpGet]
        [Route("")]
        public IHttpActionResult ObtenerRegistroCompras()
        {
            var registros = MetodosCompraEntrada.VerRegistroCompraEntrada();
            if (registros == null || registros.Count == 0)
                return NotFound();

            return Ok(registros);
        }

        // Obtener compras dentro de un rango de fechas
        [HttpGet]
        [Route("rango")]
        public IHttpActionResult ObtenerRegistroComprasPorFechas([FromUri] DateTime fechaInicio, [FromUri] DateTime fechaFin)
        {
            var registros = MetodosCompraEntrada.VerRegistroCompraEntradaFechas(fechaInicio, fechaFin);
            if (registros == null || registros.Count == 0)
                return NotFound();

            return Ok(registros);
        }


    }
}
