using BCrypt.Net; // Asegúrate de tener este using
using DAL;
using Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
                // ¡Paso CRÍTICO: Hashear la contraseña antes de guardarla!
                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(empleado.contrasena, workFactor: 12); // workFactor recomendado: 12

                Vendedor nuevoempleado = new Vendedor()
                {
                    Nombre = empleado.Nombre,
                    Cedula = empleado.Cedula,
                    Edad = empleado.FechaNacimiento, // Esto parece que deberia ser FechaNacimiento, no Edad directamente
                    Estado = 1,
                    Usuario = empleado.usuario,
                    Contra = hashedPassword, 
                    ID_Rol = empleado.ID_Rol,
                    ID_Sucursal = empleado.ID_Sucursal,
                    Email = empleado.correo
                };

                db.Vendedor.Add(nuevoempleado);
                db.SaveChanges();

                return true;
            }
            catch (Exception ex) // ¡Captura la excepción para depuración!
            {
                // Loggea el error (usar un logger real aquí es mejor que solo System.Diagnostics.Debug.WriteLine)
                System.Diagnostics.Debug.WriteLine($"Error al agregar empleado: {ex.Message}");
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

                if (!string.IsNullOrWhiteSpace(actualEmpleado.contrasena))
                {
                    actempleado.Contra = BCrypt.Net.BCrypt.HashPassword(actualEmpleado.contrasena, workFactor: 12);
                }

                actempleado.ID_Vendedor = actualEmpleado.ID_Empleado; 
                                                                     
                actempleado.Nombre = actualEmpleado.Nombre;
                actempleado.Cedula = actualEmpleado.Cedula;
                actempleado.Edad = actualEmpleado.FechaNacimiento; 
                actempleado.ID_Sucursal = actualEmpleado.ID_Sucursal;
                actempleado.ID_Rol = actualEmpleado.ID_Rol;
                actempleado.Usuario = actualEmpleado.usuario;
                actempleado.Email = actualEmpleado.correo;

                db.Entry(actempleado).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();

                return true;
            }
            catch (Exception ex) // ¡Captura la excepción!
            {
                System.Diagnostics.Debug.WriteLine($"Error al actualizar empleado: {ex.Message}");
                return false;
            }
        }

        public EmpleadoDTO ValidarLogin(string usuario, string contra)
        {
            try 
            {
                var empleado = db.Vendedor.FirstOrDefault(e =>
                    e.Usuario == usuario &&
                    e.Estado == 1
                );

                if (empleado == null)
                {
                    System.Diagnostics.Debug.WriteLine($"Login: Usuario '{usuario}' no encontrado o inactivo.");
                    return null;
                }

                System.Diagnostics.Debug.WriteLine($"Login: Usuario '{usuario}', Contraseña de DB (primeros 10 chars): {empleado.Contra?.Substring(0, Math.Min(empleado.Contra.Length, 10)) ?? "NULL/Empty"}");


                bool isPasswordAlreadyHashed = false;
                if (empleado.Contra != null && (empleado.Contra.StartsWith("$2a$") || empleado.Contra.StartsWith("$2b$") || empleado.Contra.StartsWith("$2y$")))
                {
                    isPasswordAlreadyHashed = true;
                }

                bool passwordMatches = false;

                if (isPasswordAlreadyHashed)
                {
                    try
                    {
                        passwordMatches = BCrypt.Net.BCrypt.Verify(contra, empleado.Contra);
                        System.Diagnostics.Debug.WriteLine($"Login: BCrypt.Verify resultado: {passwordMatches}");
                    }
                    catch (Exception exBCrypt)
                    {
                        System.Diagnostics.Debug.WriteLine($"Login: Error al verificar BCrypt para usuario '{usuario}': {exBCrypt.Message}");
                        return null; 
                    }
                }
                else
                {
                    passwordMatches = (empleado.Contra == contra);
                    System.Diagnostics.Debug.WriteLine($"Login: Verificación texto plano resultado: {passwordMatches}");

                    if (passwordMatches)
                    {
                        try
                        {
                            string newHashedPassword = BCrypt.Net.BCrypt.HashPassword(contra, workFactor: 12);
                            System.Diagnostics.Debug.WriteLine($"Login: Contraseña hasheada para '{usuario}'. Nuevo hash (primeros 10 chars): {newHashedPassword.Substring(0, Math.Min(newHashedPassword.Length, 10))}");

                            ActualizarContrasenaHash(empleado.ID_Vendedor, newHashedPassword);
                            empleado.Contra = newHashedPassword; 
                            System.Diagnostics.Debug.WriteLine($"Login: Contraseña de usuario '{usuario}' migrada y guardada.");
                        }
                        catch (Exception exHash)
                        {
                            System.Diagnostics.Debug.WriteLine($"Login: Error al hashear/migrar contraseña para usuario '{usuario}': {exHash.Message}");
                            return null; 
                        }
                    }
                }

                if (passwordMatches)
                {
                    System.Diagnostics.Debug.WriteLine($"Login: Credenciales correctas para usuario '{usuario}'.");
                    return new EmpleadoDTO
                    {
                        ID_Empleado = empleado.ID_Vendedor,
                        Nombre = empleado.Nombre,
                        usuario = empleado.Usuario,
                        contrasena = null,
                        correo = empleado.Email,
                        ID_Rol = empleado.ID_Rol,
                        NombreRol = empleado.ID_Rol == 1 ? "Administrador" : "Empleado",
                        ID_Sucursal = empleado.ID_Sucursal,
                        NombreSucursal = empleado.Sucursal?.Nombre
                    };
                }
                else
                {
                    System.Diagnostics.Debug.WriteLine($"Login: Contraseña incorrecta para usuario '{usuario}'.");
                    return null;
                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"******** ERROR FATAL en ValidarLogin para usuario '{usuario}': {ex.Message}");
                System.Diagnostics.Debug.WriteLine($"StackTrace: {ex.StackTrace}");
                if (ex.InnerException != null)
                {
                    System.Diagnostics.Debug.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                }
                return null; 
            }
        }

        public void ActualizarContrasenaHash(int empleadoId, string newHashedPassword)
        {
            try
            {
                var empleadoToUpdate = db.Vendedor.Find(empleadoId);
                if (empleadoToUpdate != null)
                {
                    empleadoToUpdate.Contra = newHashedPassword;
                    db.Entry(empleadoToUpdate).State = EntityState.Modified;
                    db.SaveChanges();
                    System.Diagnostics.Debug.WriteLine($"DB: Contraseña de empleado {empleadoId} actualizada con éxito.");
                }
                else
                {
                    System.Diagnostics.Debug.WriteLine($"DB: Empleado {empleadoId} no encontrado para actualizar contraseña.");
                }
            }
            catch (Exception exDb)
            {
                System.Diagnostics.Debug.WriteLine($"******** ERROR FATAL en ActualizarContrasenaHash para empleado {empleadoId}: {exDb.Message}");
                System.Diagnostics.Debug.WriteLine($"StackTrace: {exDb.StackTrace}");
                throw; 
            }
        }

        public bool GuardarTokenRecuperacion(string email, string token)
        {
            try
            {
                var empleado = db.Vendedor.FirstOrDefault(e => e.Email == email);

                if (empleado == null)
                    return false;

                empleado.ResetToken = token;
                empleado.ResetTokenExpiracion = DateTime.UtcNow.AddHours(1);

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
                var empleado = db.Vendedor.FirstOrDefault(e =>
                    e.ResetToken == token &&
                    e.ResetTokenExpiracion.HasValue && 
                    e.ResetTokenExpiracion.Value > DateTime.UtcNow 
                );

                if (empleado == null)
                {
                    System.Diagnostics.Debug.WriteLine("Token de reseteo no encontrado o expirado/inválido.");
                    return false; 
                }

                empleado.Contra = BCrypt.Net.BCrypt.HashPassword(nuevaContrasena, workFactor: 12);

                
                empleado.ResetToken = null;
                empleado.ResetTokenExpiracion = null;

                db.Entry(empleado).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Error al resetear contraseña: {ex.Message}");
                return false;
            }
        }


    }

}
