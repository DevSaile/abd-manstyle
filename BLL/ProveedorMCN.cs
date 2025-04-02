using DAL;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class ProveedorMCN
    {
        // Contexto de la base de datos (usa tu modelo de Entity Framework)
        private readonly bddVariedadesMansStyleEntities db;

        // Constructor
        public ProveedorMCN()
        {
            db = new bddVariedadesMansStyleEntities();
        }

        // Crear un nuevo proveedor
        public bool CrearProveedor(ProveedorDTO nuevoProveedor)
        {
            try
            {
                // Mapear DTO al modelo de base de datos
                var proveedor = new Proveedor
                {
                    Nombre = nuevoProveedor.Nombre,
                    Numero = nuevoProveedor.Numero,
                    Direccion = nuevoProveedor.Direccion,
                    Estado = nuevoProveedor.Estado
                };

                db.Proveedor.Add(proveedor); // Agregar a la tabla
                db.SaveChanges(); // Guardar cambios
                return true;
            }
            catch (Exception ex)
            {
                // Manejo de errores (podrías registrar el error)
                Console.WriteLine($"Error al crear proveedor: {ex.Message}");
                return false;
            }
        }

        // Obtener la lista de todos los proveedores
        public List<ProveedorDTO> ObtenerProveedores()
        {
            try
            {
                return db.Proveedor.Select(p => new ProveedorDTO
                {
                    ID_Proveedor = p.ID_Proveedor,
                    Nombre = p.Nombre,
                    Numero = p.Numero,
                    Direccion = p.Direccion,
                    Estado = p.Estado
                }).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al obtener proveedores: {ex.Message}");
                return new List<ProveedorDTO>();
            }
        }

        // Obtener un proveedor por su ID
        public ProveedorDTO ObtenerProveedorPorID(int id)
        {
            try
            {
                var proveedor = db.Proveedor.Find(id); // Buscar por ID
                if (proveedor == null) return null;

                // Mapear a DTO
                return new ProveedorDTO
                {
                    ID_Proveedor = proveedor.ID_Proveedor,
                    Nombre = proveedor.Nombre,
                    Numero = proveedor.Numero,
                    Direccion = proveedor.Direccion,
                    Estado = proveedor.Estado
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al obtener proveedor por ID: {ex.Message}");
                return null;
            }
        }

        // Actualizar un proveedor existente
        public bool ActualizarProveedor(ProveedorDTO proveedorActualizado)
        {
            try
            {
                var proveedor = db.Proveedor.Find(proveedorActualizado.ID_Proveedor);
                if (proveedor == null) return false;

                // Actualizar los campos
                proveedor.Nombre = proveedorActualizado.Nombre;
                proveedor.Numero = proveedorActualizado.Numero;
                proveedor.Direccion = proveedorActualizado.Direccion;
                proveedor.Estado = proveedorActualizado.Estado;

                db.SaveChanges(); // Guardar cambios
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al actualizar proveedor: {ex.Message}");
                return false;
            }
        }

        // Eliminar un proveedor
        public bool EliminarProveedor(ProveedorDTO proveedorActualizado)
        {
            try
            {
                var proveedor = db.Proveedor.Find(proveedorActualizado.ID_Proveedor);
                if (proveedor == null) return false;


                proveedor.Estado = proveedorActualizado.Estado;

                db.Entry(proveedorActualizado).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges(); 
                
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al actualizar proveedor: {ex.Message}");
                return false;
            }
        }
    }

}
