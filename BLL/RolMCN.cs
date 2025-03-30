using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Models;
using DAL;

namespace BLL
{
    public class RolMCN
    {

        private readonly bddVariedadesMansStyleEntities db;

        public RolMCN()
        {
            db = new bddVariedadesMansStyleEntities();
        }

        public List<RolDTO> ObtenerRoles()
        {

            return db.Rol.Select(r => new RolDTO
            {

                ID_Rol = r.ID_Rol,
                Puesto = r.ID_Rol == 1 ? "Administrador" : "Empleado",

                //NombreSucursal = v.ID_Sucursal == 1 ? "Tienda Principa" : "Tienda Primaria"

            }).ToList();

        }

        public List<RolDTO> ObtenerRolesEmpleado()
        {
            return db.Rol
                     .Where(r => r.ID_Rol == 0) // Filtra los roles donde ID_Rol sea igual a 0
                     .Select(r => new RolDTO
                     {
                         ID_Rol = r.ID_Rol,
                         Puesto = "Empleado" // Si `ID_Rol` es siempre 0 en este caso, no necesitas verificar
                     }).ToList();
        }



        public int ObtenerRolID(int? idempleado)
        {
            var rol = (from r in db.Vendedor
                       where r.ID_Vendedor == idempleado
                       select r.ID_Rol).FirstOrDefault();

            return rol ?? -1;


        }

        public string ObtenerPuesto()
        {
            var rol = (from r in db.Vendedor
                       where r.ID_Vendedor == 1
                       select r.Nombre).FirstOrDefault();

            return rol;


        }

    }

}
