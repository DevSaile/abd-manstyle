using Microsoft.IdentityModel.Tokens;
using Microsoft.Owin;
using Microsoft.Owin.Security.Jwt;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System;
using System.Text;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Owin;
using WebManStyle_ABD.Providers;
using Microsoft.Owin.Cors; 
using System.Web.Http.Cors; 


[assembly: OwinStartup(typeof(WebManStyle_ABD.Startup))]

namespace WebManStyle_ABD
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            HttpConfiguration config = new HttpConfiguration();

            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            var corsAttr = new EnableCorsAttribute("https://variedadesmanstyle.vercel.app", "*", "*"); 
            config.EnableCors(corsAttr); 

            ConfigureOAuth(app);

            ConfigureJwtTokenValidation(app);

            app.UseWebApi(config); 
        }


        private void ConfigureOAuth(IAppBuilder app)
        {
            string secretKey = System.Configuration.ConfigurationManager.AppSettings["JwtSecretKey"];
            if (string.IsNullOrEmpty(secretKey))
            {
                throw new Exception("JwtSecretKey no configurada en Web.config");
            }
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            OAuthAuthorizationServerOptions OAuthServerOptions = new OAuthAuthorizationServerOptions()
            {
                AllowInsecureHttp = false, 
                TokenEndpointPath = new PathString("/api/Auth/token"), 
                AccessTokenExpireTimeSpan = TimeSpan.FromHours(24), 
                Provider = new ApplicationOAuthProvider(), 
                AccessTokenFormat = new CustomJwtFormat("https://www.apimanstyle.somee.com", signingKey) 
            };

            app.UseOAuthAuthorizationServer(OAuthServerOptions);
        }

        private void ConfigureJwtTokenValidation(IAppBuilder app)
        {
            string secretKey = System.Configuration.ConfigurationManager.AppSettings["JwtSecretKey"];
            if (string.IsNullOrEmpty(secretKey))
            {
                throw new Exception("JwtSecretKey no configurada en Web.config");
            }
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            TokenValidationParameters validationParameters = new TokenValidationParameters()
            {
                ValidateIssuer = true, 
                ValidIssuer = "https://www.apimanstyle.somee.com", 
                ValidateAudience = false, 
                ValidateLifetime = true, 
                IssuerSigningKey = signingKey, 
                ClockSkew = TimeSpan.Zero 
            };

            app.UseJwtBearerAuthentication(
                new Microsoft.Owin.Security.Jwt.JwtBearerAuthenticationOptions
                {
                    AuthenticationMode = Microsoft.Owin.Security.AuthenticationMode.Active,
                    TokenValidationParameters = validationParameters
                });
        }
    }
}