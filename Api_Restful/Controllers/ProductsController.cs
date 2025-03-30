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


        // Método para obtener la lista de roles
        [HttpGet]
        [Route("")] // Ruta: GET api/roles

        public IHttpActionResult ObtenerProductos()
        {
            try
            {
                // Llama al método de negocio para obtener la lista de roles
                List<ProductoDTO> Productos = MetodosProducto.verproductos();

                // Devuelve los datos en formato JSON
                return Ok(Productos);
            }
            catch (System.Exception ex)
            {
                // Manejo de errores
                return InternalServerError(ex);
            }
        }
    }
}
