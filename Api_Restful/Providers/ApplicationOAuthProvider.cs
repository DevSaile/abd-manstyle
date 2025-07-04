using BLL;
using Microsoft.Owin.Security.OAuth;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Linq; 

namespace WebManStyle_ABD.Providers
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        private readonly EmpleadoMCN MetodosEmpleado = new EmpleadoMCN(); // Tu capa BLL

        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {

            string usuario = context.UserName;
            string password = context.Password;

            var empleado = MetodosEmpleado.ValidarLogin(usuario, password);

            if (empleado == null)
            {
                context.SetError("invalid_grant", "El nombre de usuario o la contraseña son incorrectos.");
                return;
            }

            var identity = new ClaimsIdentity(context.Options.AuthenticationType);

            identity.AddClaim(new Claim(ClaimTypes.Name, empleado.usuario)); 
            identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, empleado.ID_Empleado.ToString())); 

            if (!string.IsNullOrEmpty(empleado.NombreRol)) 
            {
                identity.AddClaim(new Claim(ClaimTypes.Role, empleado.NombreRol));
            }
            else
            {
                identity.AddClaim(new Claim(ClaimTypes.Role, "Usuario"));
            }

            context.Validated(identity);
        }
    }
}