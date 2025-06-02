using BLL;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Net.Mail;

namespace WebManStyle_ABD.Controllers
{
    [RoutePrefix("api/empleados")]
    public class EmpleadoController : ApiController
    {
        private readonly EmpleadoMCN MetodosEmpleado = new EmpleadoMCN();
        private readonly RolMCN MetodosRol = new RolMCN();

        // Obtener empleados activos
        [HttpGet]
        [Route("activos")]
        public IHttpActionResult ObtenerEmpleadosActivos()
        {
            var empleados = MetodosEmpleado.ObtenerVendedorActivos();
            if (empleados == null || empleados.Count == 0)
                return NotFound(); // 404 si no hay empleados activos
            return Ok(empleados);
        }

        [HttpGet]
        [Route("roles")]
        public IHttpActionResult obtenerROLES()
        {
            var roles = MetodosRol.ObtenerRoles();
            if (roles == null || roles.Count == 0)
                return NotFound(); // 404 si no hay empleados activos
            return Ok(roles);
        }

        // Obtener empleados inactivos
        [HttpGet]
        [Route("inactivos")]
        public IHttpActionResult ObtenerEmpleadosInactivos()
        {
            var empleados = MetodosEmpleado.ObtenerVendedorInActivos();
            if (empleados == null || empleados.Count == 0)
                return NotFound(); // 404 si no hay empleados inactivos
            return Ok(empleados);
        }

        // Buscar empleados por nombre
        [HttpGet]
        [Route("buscar")]
        public IHttpActionResult BuscarEmpleadoPorNombre(string nombre)
        {
            var empleados = MetodosEmpleado.BuscarEmpleadoNombre(nombre);
            if (empleados == null || empleados.Count == 0)
                return NotFound(); // 404 si no se encuentran coincidencias
            return Ok(empleados);
        }

        // Obtener empleado por ID
        [HttpGet]
        [Route("{id}")]
        public IHttpActionResult ObtenerEmpleadoPorId(int id)
        {
            var empleado = MetodosEmpleado.ObtenerEmpleadoPorId(id);
            if (empleado == null)
                return NotFound(); // 404 si no se encuentra el empleado
            return Ok(empleado);
        }

        // Agregar empleado
        [HttpPost]
        [Route("agregar")]
        public IHttpActionResult AgregarEmpleado([FromBody] EmpleadoDTO nuevoEmpleado)
        {
            if (!ModelState.IsValid)
            {
                var errores = ModelState.Values.SelectMany(v => v.Errors)
                                               .Select(e => e.ErrorMessage)
                                               .ToList();
                return BadRequest(string.Join("; ", errores)); // Muestra errores específicos
            }

            var resultado = MetodosEmpleado.AgregarEmpleado(nuevoEmpleado);
            if (!resultado)
                return InternalServerError(new Exception("Error al agregar el empleado."));

            return Ok("Empleado agregado correctamente.");
        }

        // Actualizar empleado
        [HttpPut]
        [Route("actualizar")]
        public IHttpActionResult ActualizarEmpleado([FromBody] EmpleadoDTO empleadoActualizado)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState); // 400 si el modelo no es válido

            var resultado = MetodosEmpleado.ActualizarEmpleado(empleadoActualizado);
            if (!resultado)
                return InternalServerError(new Exception("Error al actualizar el empleado."));
            return Ok("Empleado actualizado correctamente.");
        }

        // Eliminar empleado (cambiar estado a inactivo)
        [HttpPut]
        [Route("eliminar")]
        public IHttpActionResult EliminarEmpleado([FromBody] EmpleadoDTO empleadoEliminado)
        {
            var resultado = MetodosEmpleado.EliminarEmpleado(empleadoEliminado);
            if (!resultado)
                return InternalServerError(new Exception("Error al eliminar el empleado."));
            return Ok("Empleado eliminado correctamente.");
        }


    }

}
