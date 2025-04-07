using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;


namespace WebManStyle_ABD
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Rutas de Web API
            config.MapHttpAttributeRoutes();

            // Habilitar CORS globalmente
            var cors = new EnableCorsAttribute("*", "*", "*"); // Permite acceso desde cualquier origen
            config.EnableCors(cors);

            // Configuración y servicios de Web API

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
