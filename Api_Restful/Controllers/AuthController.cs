using BLL;
using Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims; // Necesario para acceder a Claims
using System.Web; 
using System.Web.Http;

namespace WebManStyle_ABD.Controllers
{
    [RoutePrefix("api/Auth")]
    public class AuthController : ApiController
    {
        private readonly EmpleadoMCN MetodosEmpleado = new EmpleadoMCN();
        private readonly RolMCN MetodosRol = new RolMCN();

        [HttpPost]
        [Route("login")]
        public IHttpActionResult Login([FromBody] LoginDTO datos)
        {
            if (string.IsNullOrWhiteSpace(datos.Usuario) || string.IsNullOrWhiteSpace(datos.Contra))
                return BadRequest("Usuario o contraseña vacíos.");

            var empleado = MetodosEmpleado.ValidarLogin (datos.Usuario, datos.Contra);

            if (empleado == null)
                return Unauthorized();

            var tokenRequest = new HttpRequestMessage(HttpMethod.Post, Request.RequestUri.GetLeftPart(UriPartial.Authority) + "/api/Auth/token");
            tokenRequest.Content = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("grant_type", "password"),
                new KeyValuePair<string, string>("username", datos.Usuario),
                new KeyValuePair<string, string>("password", datos.Contra)
            });

            using (var client = new HttpClient())
            {
                var response = client.SendAsync(tokenRequest).Result;
                var responseContent = response.Content.ReadAsStringAsync().Result;

                if (response.IsSuccessStatusCode)
                {
                    JObject tokenResponse = JObject.Parse(responseContent);

                    JObject empleadoData = new JObject
                    {
                        { "ID_Empleado", empleado.ID_Empleado },
                        { "Id_Rol", empleado.ID_Rol },                        
                        { "NombreUsuario", empleado.usuario },
                        { "ID_Sucursal", empleado.ID_Sucursal }, 
                        { "NombreRol", empleado.NombreRol }, 
                    };

                    tokenResponse.Add("empleado", empleadoData);

                    return Ok(tokenResponse);
                }
                else
                {
                    return Content(response.StatusCode, JObject.Parse(responseContent));
                }
            }
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

            var token = Guid.NewGuid().ToString();

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

        // --- EJEMPLOS DE ENDPOINTS PROTEGIDOS ---

        [Authorize] // Solo usuarios autenticados pueden acceder
        [HttpGet]
        [Route("perfil")]
        public IHttpActionResult GetPerfilUsuario()
        {
            // Acceder a la información del usuario autenticado (claims)
            var identity = User.Identity as ClaimsIdentity;
            if (identity == null)
            {
                return Unauthorized(); // Esto no debería pasar si [Authorize] funciona correctamente
            }

            string nombreUsuario = identity.FindFirst(ClaimTypes.Name)?.Value;
            string idEmpleado = identity.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            List<string> roles = identity.FindAll(ClaimTypes.Role).Select(c => c.Value).ToList();

            return Ok(new
            {
                id = idEmpleado,
                usuario = nombreUsuario,
                roles = roles,
                mensaje = "¡Acceso autorizado!"
            });
        }

        [Authorize(Roles = "Administrador")] // Solo usuarios con el rol "Administrador"
        [HttpGet]
        [Route("admin/usuarios")]
        public IHttpActionResult GetUsuariosAdmin()
        {
            // Lógica para obtener usuarios (solo para administradores)
            return Ok(new { message = "Lista de usuarios (solo para administradores)" });
        }

        [Authorize(Roles = "Administrador, Editor")] // Administradores o Editores
        [HttpPost]
        [Route("contenido/publicar")]
        public IHttpActionResult PublicarContenido()
        {
            // Lógica para publicar contenido
            return Ok(new { message = "Contenido publicado con éxito (Admin o Editor)" });
        }
    }
}