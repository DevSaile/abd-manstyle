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

    [RoutePrefix("api/categorias")]
    public class CategoriasController : ApiController
    {

        private readonly CategoriaMCN _categoriaMCN = new CategoriaMCN();

        // Obtener categorías activas
        [HttpGet]
        [Route("activas")]
        public IHttpActionResult ObtenerCategoriasActivas()
        {
            var categorias = _categoriaMCN.ObtenerCategoriasActivas();
            if (categorias == null || categorias.Count == 0)
                return NotFound();

            return Ok(categorias);
        }

        // Obtener categorías inactivas
        [HttpGet]
        [Route("inactivas")]
        public IHttpActionResult ObtenerCategoriasInActivas()
        {
            var categorias = _categoriaMCN.ObtenerCategoriasInActivas();
            if (categorias == null || categorias.Count == 0)
                return NotFound();

            return Ok(categorias);
        }

        // Obtener categorías por ID de producto
        [HttpGet]
        [Route("producto/{idCategoria:int}")]
        public IHttpActionResult ObtenerCategoriasPorID(int idCategoria)
        {
            var categorias = _categoriaMCN.ObtenerCategoriasPorID(idCategoria);
            if (categorias == null || categorias.Count == 0)
                return NotFound();

            return Ok(categorias);
        }

        // Obtener una categoría por nombre
        [HttpGet]
        [Route("nombre/{nombreCategoria}")]
        public IHttpActionResult ObtenerNombreCategoria(string nombreCategoria)
        {
            var categoria = _categoriaMCN.ObtenerNombreCategoria(nombreCategoria);
            if (categoria == null)
                return NotFound();

            return Ok(categoria);
        }

        // Actualizar una categoría
        [Authorize(Roles = "Administrador")] // Solo usuarios con el rol "Administrador"
        [HttpPut]
        [Route("actualizar")]
        public IHttpActionResult ActualizarCategoria([FromBody] CategoriaDTO actualcate)
        {
            if (actualcate == null)
                return BadRequest("Datos de categoría inválidos.");

            bool resultado = _categoriaMCN.ActualizarCategoria(actualcate);
            if (!resultado)
                return InternalServerError();

            return Ok("Categoría actualizada correctamente.");
        }

        // Cambiar estado de una categoría (Eliminar/Inactivar)
        [Authorize(Roles = "Administrador")] // Solo usuarios con el rol "Administrador"

        [HttpPut]
        [Route("eliminar")]
        public IHttpActionResult EliminarCategoria([FromBody] CategoriaDTO actualcate)
        {
            if (actualcate == null)
                return BadRequest("Datos de categoría inválidos.");

            bool resultado = _categoriaMCN.EliminarCategoria(actualcate);
            if (!resultado)
                return InternalServerError();

            return Ok("Estado de la categoría actualizado correctamente.");
        }

        // Agregar una nueva categoría
        [Authorize(Roles = "Administrador")] // Solo usuarios con el rol "Administrador"

        [HttpPost]
        [Route("agregar")]
        public IHttpActionResult AgregarCategoria([FromBody] CategoriaDTO nuevaCategoria)
        {
            if (nuevaCategoria == null)
                return BadRequest("Datos de categoría inválidos.");

            bool resultado = _categoriaMCN.AgregarCategoria(nuevaCategoria);
            if (!resultado)
                return InternalServerError();

            return Ok("Categoría agregada correctamente.");
        }

    }

}
