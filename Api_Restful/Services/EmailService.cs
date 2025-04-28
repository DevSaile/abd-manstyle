using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Net.Mail;

namespace WebManStyle_ABD.Services
{
    public class EmailService
    {
        public static bool EnviarCorreoRecuperacion(string correoDestino, string token)
        {
            try
            {
                var fromAddress = new MailAddress("jessereliasjimenez@gmail.com");
                var toAddress = new MailAddress(correoDestino);
                var fromPassword = "xjjl lxdg xpie wbso"; 
                const string subject = "Recuperación de contraseña";
                string body = $"<h2>Recuperar tu contraseña</h2><p>Para recuperar tu contraseña haz click en el siguiente enlace:</p>" +
                              $"<a href='https://localhost:5173/resetear-contrasena/{token}'>Recuperar Contraseña</a>";

                var smtp = new SmtpClient
                {
                    Host = "smtp.gmail.com", // O tu servidor SMTP
                    Port = 587,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    Credentials = new NetworkCredential(fromAddress.Address, fromPassword),
                    Timeout = 20000
                };

                using (var message = new MailMessage(fromAddress, toAddress)
                {
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true
                })
                {
                    smtp.Send(message);
                }

                return true;
            }
            catch (Exception ex)
            {
                // Aquí puedes loguear el error
                Console.WriteLine("Error enviando correo: " + ex.Message);
                return false;
            }
        }
    }
}