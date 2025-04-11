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

    [RoutePrefix("api/sucursales")] // Ruta base para este controlador

    public class SucursalController : ApiController
    {

        private readonly SucursalMCN _sucursalMCN = new SucursalMCN();

        // Obtener todas las sucursales
        [HttpGet]
        [Route("")]
        public IHttpActionResult ObtenerSucursales()
        {
            var sucursales = _sucursalMCN.ObtenerSucursales();
            if (sucursales == null || sucursales.Count == 0)
                return NotFound();

            return Ok(sucursales);
        }

        // Obtener ID de sucursal por ID de empleado
        [HttpGet]
        [Route("empleado/{idempleado:int}")]
        public IHttpActionResult ObtenerSucursalID(int idempleado)
        {
            var sucursalID = _sucursalMCN.ObtenerSucursalID(idempleado);
            if (sucursalID == -1)
                return NotFound();

            return Ok(sucursalID);
        }

        // Devolver sucursal asociada a un producto
        [HttpGet]
        [Route("producto/{idproducto:int}")]
        public IHttpActionResult DevolverSucursalProductos(int idproducto)
        {
            var sucursalNombre = _sucursalMCN.DevolverSucursalProductos(idproducto);
            if (string.IsNullOrEmpty(sucursalNombre))
                return NotFound();

            return Ok(sucursalNombre);
        }

        // Devolver marca asociada a un producto
        [HttpGet]
        [Route("marca/{idproducto:int}")]
        public IHttpActionResult DevolverMarcaProductos(int idproducto)
        {
            var marca = _sucursalMCN.DevolverMarcaProductos(idproducto);
            if (string.IsNullOrEmpty(marca))
                return NotFound();

            return Ok(marca);
        }

        // Obtener sucursales asociadas a un producto por ID
        [HttpGet]
        [Route("producto/sucursales/{idproducto:int}")]
        public IHttpActionResult ObtenerSucursalesPorID(int idproducto)
        {
            var sucursales = _sucursalMCN.ObtenerSucursalesPorID(idproducto);
            if (sucursales == null || sucursales.Count == 0)
                return NotFound();

            return Ok(sucursales);
        }
        // Obtener totales relacionados con una sucursal específica
        [HttpGet]
        [Route("totales/{idSucursal:int}")]
        public IHttpActionResult ObtenerTotalesSucursal(int idSucursal)
        {
            var resultado = _sucursalMCN.ObtenerTotalesSucursal(idSucursal);
            if (resultado == null || resultado.Count == 0)
                return NotFound();

            return Ok(resultado);
        }

        // Obtener productos agrupados por categoría para una sucursal específica
        [HttpGet]
        [Route("categorias/{idSucursal:int}")]
        public IHttpActionResult ObtenerProductosPorCategoria(int idSucursal)
        {
            var productosPorCategoria = _sucursalMCN.ObtenerProductosPorCategoria(idSucursal);
            if (productosPorCategoria == null || productosPorCategoria.Count == 0)
                return NotFound();

            return Ok(productosPorCategoria);
        }

        // Obtener los 5 productos con mayor stock para una sucursal específica
        [HttpGet]
        [Route("top-stock/{idSucursal:int}")]
        public IHttpActionResult ObtenerTop5MayorStock(int idSucursal)
        {
            var topProductos = _sucursalMCN.ObtenerTop5MayorStock(idSucursal);
            if (topProductos == null || topProductos.Count == 0)
                return NotFound();

            return Ok(topProductos);
        }

        // Obtener productos con bajo stock para una sucursal específica según un umbral
        [HttpGet]
        [Route("bajo-stock/{idSucursal:int}/{umbral:int}")]
        public IHttpActionResult ObtenerProductosBajoStock(int idSucursal, int umbral)
        {
            var productosBajoStock = _sucursalMCN.ObtenerProductosBajoStock(idSucursal, umbral);
            if (productosBajoStock == null || productosBajoStock.Count == 0)
                return NotFound();

            return Ok(productosBajoStock);
        }

    }
}
