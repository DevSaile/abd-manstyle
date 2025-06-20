﻿using BLL;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebManStyle_ABD.Controllers
{
    [RoutePrefix("api/marcas")]
    public class MarcasController : ApiController
    {
        private readonly MarcasMCN _marcasMCN = new MarcasMCN();

        // Obtener todas las marcas
        [HttpGet]
        [Route("todas")]
        public IHttpActionResult ObtenerMarcas()
        {
            var marcas = _marcasMCN.ObtenerMarcas();
            if (marcas == null || marcas.Count == 0)
                return NotFound();

            return Ok(marcas);
        }

        // Obtener una marca por ID
        [HttpGet]
        [Route("id/{idMarca:int}")]
        public IHttpActionResult ObtenerMarcaPorID(int idMarca)
        {
            var marca = _marcasMCN.ObtenerMarcaPorID(idMarca);
            if (marca == null)
                return NotFound();

            return Ok(marca);
        }

        // Obtener una marca por nombre
        [HttpGet]
        [Route("nombre/{nombreMarca}")]
        public IHttpActionResult ObtenerNombreMarca(string nombreMarca)
        {
            var marca = _marcasMCN.ObtenerNombreMarca(nombreMarca);
            if (marca == null)
                return NotFound();

            return Ok(marca);
        }

        // Actualizar una marca
        [HttpPut]
        [Route("actualizar")]
        public IHttpActionResult ActualizarMarca([FromBody] MarcasDTO actualMarca)
        {
            if (actualMarca == null)
                return BadRequest("Datos de marca inválidos.");

            bool resultado = _marcasMCN.ActualizarMarca(actualMarca);
            if (!resultado)
                return InternalServerError();

            return Ok("Marca actualizada correctamente.");
        }

        // Eliminar una marca por ID
        [HttpPut]
        [Route("eliminar")]
        public IHttpActionResult EliminarMarca([FromBody] MarcasDTO actualMarca)
        {
            if (actualMarca == null)
                return BadRequest("Datos de Marca inválidos.");

            bool resultado = _marcasMCN.EliminarMarca(actualMarca);
            if (!resultado)
                return InternalServerError();

            return Ok("Estado de la Marca actualizado correctamente.");
        }

        // Agregar una nueva marca
        [HttpPost]
        [Route("agregar")]
        public IHttpActionResult AgregarMarca([FromBody] MarcasDTO nuevaMarca)
        {
            if (nuevaMarca == null)
                return BadRequest("Datos de marca inválidos.");

            bool resultado = _marcasMCN.AgregarMarca(nuevaMarca);
            if (!resultado)
                return InternalServerError();

            return Ok("Marca agregada correctamente.");
        }
    }
}