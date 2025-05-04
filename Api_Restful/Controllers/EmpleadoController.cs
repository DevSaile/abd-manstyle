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

        [HttpPost]
        [Route("login")]
        public IHttpActionResult Login([FromBody] LoginDTO datos)
        {
            if (string.IsNullOrWhiteSpace(datos.Usuario) || string.IsNullOrWhiteSpace(datos.Contra))
                return BadRequest("Usuario o contraseña vacíos.");

            var empleado = MetodosEmpleado.ValidarLogin(datos.Usuario, datos.Contra);

            if (empleado == null)
                return Unauthorized(); // 401 si no coincide usuario o contraseña

            return Ok(empleado); // Puedes devolver EmpleadoDTO o algo como token + info básica
        }

        [HttpPost]
        [Route("solicitar-recuperacion")]
        public IHttpActionResult SolicitarRecuperacion(RecoverRequestDTO request)
        {
            if (string.IsNullOrEmpty(request.Email))
                return BadRequest("El email es obligatorio.");

            var empleado = MetodosEmpleado.BuscarEmpleadoPorEmail(request.Email);

            if (empleado == null)
                return NotFound();

            var token = Guid.NewGuid().ToString(); // 🔥 Generar token seguro

            var guardado = MetodosEmpleado.GuardarTokenRecuperacion(empleado.correo, token);

            if (!guardado)
                return InternalServerError(new Exception("No se pudo guardar el token de recuperación."));

            // Enviar correo
            bool enviado = Services.EmailService.EnviarCorreoRecuperacion(empleado.correo, token);

            if (!enviado)
                return InternalServerError(new Exception("No se pudo enviar el correo."));

            return Ok(new { success = true, message = "Correo enviado correctamente." });
        }


        [HttpPost]
        [Route("email")]
        public IHttpActionResult SolicitarEmail(RecoverRequestDTO request)
        {
            var empleado = MetodosEmpleado.BuscarEmpleadoPorEmail(request.Email);
            if (empleado == null)
                return NotFound(); // 404 si no se encuentra el empleado
            return Ok(empleado);
        }

        // RESETEAR CONTRASEÑA
        [HttpPost]
        [Route("resetear-contrasena")]
        public IHttpActionResult ResetearContrasena(ResetPasswordDTO resetPasswordDTO)
        {
            if (resetPasswordDTO == null || string.IsNullOrEmpty(resetPasswordDTO.Token) || string.IsNullOrEmpty(resetPasswordDTO.NuevaContrasena))
            {
                return BadRequest("Datos incompletos");
            }

            var resultado = MetodosEmpleado.ResetearContrasena(resetPasswordDTO.Token, resetPasswordDTO.NuevaContrasena);

            if (!resultado)
            {
                return BadRequest("Token inválido o expirado.");
            }

            return Ok(new { success = true, message = "Contraseña actualizada correctamente." });
        }



    }

}
