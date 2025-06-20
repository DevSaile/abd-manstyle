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
