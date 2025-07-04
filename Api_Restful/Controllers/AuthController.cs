using BLL;
using Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims; 
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

            var empleado = MetodosEmpleado.ValidarLogin(datos.Usuario, datos.Contra);

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
                    System.Diagnostics.Debug.WriteLine($"Error al obtener token. Status Code: {response.StatusCode}. Content: {responseContent}");

                    try
                    {
                        JObject errorContent = JObject.Parse(responseContent);

                        return Content(response.StatusCode, errorContent);
                    }
                    catch (Newtonsoft.Json.JsonReaderException)
                    {
                        var errorContent = new JObject
                        {
                            { "error", "server_error" },
                            { "error_description", $"Unexpected response format from token endpoint. Status: {response.StatusCode}. Content: {responseContent.Substring(0, Math.Min(responseContent.Length, 200))}..." }
                        };

                        return Content(response.StatusCode, errorContent);
                    }
                    catch (Exception ex)
                    {
                        var errorContent = new JObject
                        {
                            { "error", "parsing_error" },
                            { "error_description", $"An unexpected error occurred while parsing token response: {ex.Message}" }
                        };

                        return Content(response.StatusCode, errorContent);
                    }
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

    }
}