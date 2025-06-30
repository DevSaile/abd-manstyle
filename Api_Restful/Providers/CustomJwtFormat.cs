using Microsoft.IdentityModel.Tokens;
using Microsoft.Owin.Security;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace WebManStyle_ABD.Providers
{
    public class CustomJwtFormat : ISecureDataFormat<AuthenticationTicket>
    {
        private readonly string _issuer;
        private readonly SymmetricSecurityKey _signingKey;

        public CustomJwtFormat(string issuer, SymmetricSecurityKey signingKey)
        {
            _issuer = issuer;
            _signingKey = signingKey;
        }

        public string Protect(AuthenticationTicket data)
        {
            if (data == null)
            {
                throw new ArgumentNullException(nameof(data));
            }

            var now = DateTime.UtcNow;
            var expires = now.Add(data.Properties.ExpiresUtc.Value.Subtract(data.Properties.IssuedUtc.Value));

            var securityToken = new JwtSecurityToken(
                _issuer,
                "WebManStyle_ABD_Audience", // Puedes especificar una audiencia aquí si lo necesitas
                data.Identity.Claims,
                now,
                expires,
                new SigningCredentials(_signingKey, SecurityAlgorithms.HmacSha256)
            );

            var handler = new JwtSecurityTokenHandler();
            var jwt = handler.WriteToken(securityToken);

            return jwt;
        }

        public AuthenticationTicket Unprotect(string protectedText)
        {
            throw new NotImplementedException(); // No necesitamos implementar esto para el servidor de autenticación
        }
    }
}