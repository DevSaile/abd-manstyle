﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Models;
using DAL;

namespace BLL
{
    public class EmpleadoMCN
    {
        private readonly bddVariedadesMansStyleEntities db;

        public EmpleadoMCN()
        {
            db = new bddVariedadesMansStyleEntities();
        }

        public List<EmpleadoDTO> ObtenerVendedorActivos()
        {
            return db.Vendedor
                .Where(v => v.Estado == 1)
                .Select(v => new EmpleadoDTO
                {
                    ID_Empleado = v.ID_Vendedor,
                    ID_Rol = v.ID_Rol,
                    ID_Sucursal = v.ID_Sucursal,
                    NombreEstado = "Activo",
                    Nombre = v.Nombre,
                    Cedula = v.Cedula,
                    FechaNacimiento = v.Edad,
                    NombreRol = v.ID_Rol == 1 ? "Administrador" : "Empleado",
                    NombreSucursal = v.ID_Sucursal == 1 ? "Tienda Principal" : "Tienda Primaria",
                    usuario = v.Usuario,
                    correo = v.Email,
                    contrasena = v.Contra
                })
                .ToList();
        }

        public List<EmpleadoDTO> ObtenerVendedorInActivos()
        {
            return db.Vendedor
                .Where(v => v.Estado == 0)
                .Select(v => new EmpleadoDTO
                {
                    ID_Empleado = v.ID_Vendedor,
                    NombreEstado = "Inactivo",
                    Nombre = v.Nombre,
                    Cedula = v.Cedula,
                    FechaNacimiento = v.Edad,
                    NombreRol = v.ID_Rol == 1 ? "Administrador" : "Empleado",
                    NombreSucursal = v.ID_Sucursal == 1 ? "Tienda Principal" : "Tienda Primaria"
                })
                .ToList();
        }

        public List<EmpleadoDTO> BuscarEmpleadoNombre(string namecate)
        {
            return db.Vendedor
                .Where(v => v.Nombre.ToLower().Contains(namecate.ToLower()))
                .Select(v => new EmpleadoDTO
                {
                    ID_Empleado = v.ID_Vendedor,
                    NombreEstado = "Activo",
                    Nombre = v.Nombre,
                    Cedula = v.Cedula,
                    FechaNacimiento = v.Edad,
                    NombreRol = v.ID_Rol == 1 ? "Administrador" : "Empleado",
                    NombreSucursal = v.ID_Sucursal == 1 ? "Tienda Principal" : "Tienda Primaria"
                })
                .ToList();
        }

        public EmpleadoDTO ObtenerEmpleadoPorId(int idEmpleado)
        {
            return db.Vendedor
                .Where(e => e.ID_Vendedor == idEmpleado && e.Estado != 0)
                .Select(e => new EmpleadoDTO
                {
                    Nombre = e.Nombre,
                    Cedula = e.Cedula,
                    FechaNacimiento = e.Edad,
                    usuario = e.Usuario,
                    contrasena = e.Contra
                })
                .FirstOrDefault();
        }

        public bool AgregarEmpleado(EmpleadoDTO empleado)
        {
            try
            {
                Vendedor nuevoempleado = new Vendedor()
                {
                    Nombre = empleado.Nombre,
                    Cedula = empleado.Cedula,
                    Edad = empleado.FechaNacimiento,
                    Estado = 1,
                    Usuario = empleado.usuario,
                    Contra = empleado.contrasena,
                    ID_Rol = empleado.ID_Rol,
                    ID_Sucursal = empleado.ID_Sucursal,
                    Email = empleado.correo
                };

                db.Vendedor.Add(nuevoempleado);
                db.SaveChanges();

                return true;
            }
            catch
            {
                return false;
            }
        }

        public EmpleadoDTO BuscarEmpleadoPorEmail(string email)
        {
            var empleado = db.Vendedor
                .Where(u => u.Email == email && u.Estado == 1) // Condición para email y estado activo
                .Select(v => new EmpleadoDTO
                {
                    ID_Empleado = v.ID_Vendedor,
                    NombreEstado = "Activo", // Asumiendo que Estado == 1 siempre es "Activo"
                    Nombre = v.Nombre,
                    Cedula = v.Cedula,
                    FechaNacimiento = v.Edad,
                    NombreRol = v.ID_Rol == 1 ? "Administrador" : "Empleado",
                    NombreSucursal = v.ID_Sucursal == 1 ? "Tienda Principal" : "Tienda Primaria",
                    correo = v.Email,
                })
                .FirstOrDefault(); // Retorna solo un empleado o null si no encuentra coincidencias

            return empleado;
        }

        public bool EliminarEmpleado(EmpleadoDTO ripempleado)
        {
            try
            {
                Vendedor ripvendedor = db.Vendedor.Find(ripempleado.ID_Empleado);

                if (ripvendedor is null)
                {
                    return false;
                }

                ripvendedor.Estado = 0;

                db.Entry(ripvendedor).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();

                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool ActualizarEmpleado(EmpleadoDTO actualEmpleado)
        {
            try
            {
                Vendedor actempleado = db.Vendedor.Find(actualEmpleado.ID_Empleado);

                if (actempleado is null)
                {
                    return false;
                }

                actempleado.ID_Vendedor = actualEmpleado.ID_Empleado;
                actempleado.Nombre = actualEmpleado.Nombre;
                actempleado.Cedula = actualEmpleado.Cedula;
                actempleado.Edad = actualEmpleado.FechaNacimiento;
                actempleado.ID_Sucursal = actualEmpleado.ID_Sucursal;
                actempleado.ID_Rol = actualEmpleado.ID_Rol;
                actempleado.Usuario = actualEmpleado.usuario;
                actempleado.Contra = actualEmpleado.contrasena;
                actempleado.Email = actualEmpleado.correo;

                db.Entry(actempleado).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();

                return true;
            }
            catch
            {
                return false;
            }
        }

        public EmpleadoDTO ValidarLogin(string usuario, string contra)
        {
            var empleado = db.Vendedor.FirstOrDefault(e =>
                e.Usuario == usuario &&
                e.Contra == contra &&
                e.Estado == 1 // solo empleados activos
            );

            if (empleado == null) return null;

            return new EmpleadoDTO
            {
                ID_Empleado = empleado.ID_Vendedor,
                Nombre = empleado.Nombre,
                usuario = empleado.Usuario,
                contrasena = null, // por seguridad, puedes omitirla
                correo = empleado.Email,
                ID_Rol = empleado.ID_Rol,
                NombreRol = empleado.Rol?.Puesto,
                ID_Sucursal = empleado.ID_Sucursal,
                NombreSucursal = empleado.Sucursal?.Nombre
            };
        }

        public bool GuardarTokenRecuperacion(string email, string token)
        {
            try
            {

                    var empleado = db.Vendedor.FirstOrDefault(e => e.Email == email);

                    if (empleado == null)
                        return false;

                    empleado.ResetToken = token;
                    empleado.ResetTokenExpiracion = DateTime.Now.AddHours(1); // Token válido 1 hora

                    db.Entry(empleado).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    return true;
                
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error guardando token: " + ex.Message);
                return false;
            }
        }


        public bool ResetearContrasena(string token, string nuevaContrasena)
        {
            try
            {
                // Buscar usuario con ese token
                var empleado = db.Vendedor.FirstOrDefault(e => e.ResetToken == token && e.ResetTokenExpiracion > DateTime.Now);

                if (empleado == null)
                    return false;

                // Actualizar la contraseña
                empleado.Contra = nuevaContrasena; // 🔥 (IMPORTANTE: En futuro deberías hacer hashing aquí)

                // Limpiar el token para que no lo usen otra vez
                empleado.ResetToken = null;
                empleado.ResetTokenExpiracion = null;

                db.Entry(empleado).State = System.Data.Entity.EntityState.Modified;

                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }



    }

}
