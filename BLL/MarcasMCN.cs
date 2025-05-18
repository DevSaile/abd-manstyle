using DAL;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class MarcasMCN
    {
        private readonly bddVariedadesMansStyleEntities db;

        public MarcasMCN()
        {
            db = new bddVariedadesMansStyleEntities();
        }

        // Obtener todas las marcas activas
        public List<MarcasDTO> ObtenerMarcas()
        {
            return db.Marcas
                .Select(m => new MarcasDTO
                {
                    ID_Marca = m.ID_Marca,
                    Nombre = m.Nombre
                })
                .ToList();
        }

        // Obtener una marca por ID
        public MarcasDTO ObtenerMarcaPorID(int ID_Marca)
        {
            return db.Marcas
                .Where(m => m.ID_Marca == ID_Marca)
                .Select(m => new MarcasDTO
                {
                    ID_Marca = m.ID_Marca,
                    Nombre = m.Nombre
                })
                .FirstOrDefault();
        }

        // Obtener una marca por nombre
        public MarcasDTO ObtenerNombreMarca(string nombreMarca)
        {
            return db.Marcas
                .Where(m => m.Nombre == nombreMarca)
                .Select(m => new MarcasDTO
                {
                    ID_Marca = m.ID_Marca,
                    Nombre = m.Nombre
                })
                .FirstOrDefault();
        }

        // Actualizar una marca
        public bool ActualizarMarca(MarcasDTO marcaActualizada)
        {
            try
            {
                var marca = db.Marcas.Find(marcaActualizada.ID_Marca);

                if (marca == null)
                    return false;

                marca.Nombre = marcaActualizada.Nombre;

                db.Entry(marca).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();

                return true;
            }
            catch
            {
                return false;
            }
        }

        // Eliminar una marca por ID
        public bool EliminarMarca(int ID_Marca)
        {
            try
            {
                var marca = db.Marcas.Find(ID_Marca);

                if (marca == null)
                    return false;

                db.Marcas.Remove(marca);
                db.SaveChanges();

                return true;
            }
            catch
            {
                return false;
            }
        }

        // Agregar una nueva marca
        public bool AgregarMarca(MarcasDTO nuevaMarca)
        {
            try
            {
                var marca = new Marcas
                {
                    Nombre = nuevaMarca.Nombre
                };

                db.Marcas.Add(marca);
                db.SaveChanges();

                return true;
            }
            catch
            {
                return false;
            }
        }
    }

}
