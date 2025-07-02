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

    [RoutePrefix("api/productos")] // Ruta base para este controlador

    public class ProductsController : ApiController
    {

        // Instancia de tu clase de negocio (como lo haces en tu capa de presentación)
        private readonly ProductoMCN MetodosProducto = new ProductoMCN();

        // Obtener la lista de productos activos
        [HttpGet]
        [Route("")]
        public IHttpActionResult ObtenerProductos()
        {
            var productos = MetodosProducto.verproductos();
            if (productos == null || productos.Count == 0)
                return NotFound();

            return Ok(productos);
        }

        [HttpGet]
        [Route("totalsID")]
        public IHttpActionResult ObtenerIDtotales()
        {
            var productos = MetodosProducto.getmaxID();

            return Ok(productos);
        }

        [HttpGet]
        [Route("InfoDeCompra")]
        public IHttpActionResult ExtraerInfoCompra()
        {
            var productos = MetodosProducto.ExtraerInfoCompra();
            if (productos == null || productos.Count == 0)
                return NotFound();

            return Ok(productos);
        }

        [HttpPost]
        [Route("agregar")]
        public IHttpActionResult AgregarProducto([FromBody] ProductoDTO nuevoProducto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            int resultado = MetodosProducto.AgregarProducto(nuevoProducto);
            if (resultado == -1)
                return InternalServerError();

            return Ok(new { mensaje = "Producto agregado correctamente.", ID_Producto = resultado });
        }
        
        [HttpPut]
        [Route("actualizar/{id:int}")]
        public IHttpActionResult ActualizarProducto(int id, [FromBody] ProductoDTO productoActualizado)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != productoActualizado.ID_Producto)
                return BadRequest("El ID del producto no coincide.");

            // Validación adicional de precio
            if (productoActualizado.Precio_Producto <= 0)
                return BadRequest("El precio debe ser mayor que cero.");

            int resultado = MetodosProducto.ActulizarProducto(productoActualizado);

            if (resultado == -1)
                return NotFound();

            if (resultado == -2)
                return BadRequest("La sucursal o categoría especificada no existe");

            return Ok(new
            {
                success = true,
                message = "Producto actualizado correctamente",
                productId = resultado
            });
        }

        [HttpPut]
        [Route("actualizarExistente/{id:int}")]
        public IHttpActionResult ActualizarProductoExistente(int id, [FromBody] ProductoDTO productoActualizado)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != productoActualizado.ID_Producto)
                return BadRequest("El ID del producto no coincide.");


            int resultado = MetodosProducto.ActualizarProductoExistente(productoActualizado);


            return Ok(new
            {
                success = true,
                message = "Producto exitente actualizado correctamente",
                productId = resultado
            });
        }

        [HttpPut]
        [Route("eliminar/{id:int}")] // Este de aqui baicamente es el que me ayuda a elimiarr el producto o cambiar el estado a inactivo o sea 0

        public IHttpActionResult EliminarProducto(int id, [FromBody] ProductoDTO productoEliminado)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != productoEliminado.ID_Producto)
                return BadRequest("El ID del producto no coincide.");

            int resultado = MetodosProducto.KILLProductoExistente(productoEliminado);
            if (resultado == -1)
                return NotFound();

            return Ok("Estado del producto actualizado correctamente.");
        }

        [HttpPut]
        [Route("descartar/{id:int}")] // Este de aqui baicamente es el que me ayuda a descartar el producto o cambiar el estado a inactivo o sea 0
        public IHttpActionResult DescartarProducto(int id, [FromBody] ProductoDTO productoDescartado)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != productoDescartado.ID_Producto)
                return BadRequest($"El ID del producto no coincide");

            int resultado = MetodosProducto.DescartarProductos(productoDescartado);
            if (resultado == -1)
                return NotFound();

            return Ok("Estado del producto actualizado correctamente.");
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult BuscarProductoPorID(int id)
        {
            var producto = MetodosProducto.BuscarPorID(id);
            if (producto == null)
                return NotFound(); // Retorna 404 si no existe el producto

            return Ok(producto); // Retorna el producto si se encuentra
        }

        [HttpGet]
        [Route("sucursal/{idSucursal}")]
        public IHttpActionResult ObtenerProductosPorSucursal(int idSucursal)
        {
            var productos = MetodosProducto.BuscarProductoPorSucursal(idSucursal);

            if (productos == null || productos.Count == 0)
                return NotFound(); // Si no hay productos o la sucursal no existe

            return Ok(productos); // Devuelve la lista de productos como respuesta
        }
    }
}
