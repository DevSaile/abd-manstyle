using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

using Models;
using DAL;
using System.Diagnostics;

namespace BLL
{
    public class ProductoMCN
    {

        private readonly bddVariedadesMansStyleEntities db;

        public ProductoMCN()
        {

            db = new bddVariedadesMansStyleEntities();
        }

        public List<ProductoDTO> BuscarProductoPorSucursal(int sucursalprodu)
        {
            var productos = (from p in db.Producto
                             where p.ID_Sucursal == sucursalprodu && p.Estado != 0
                             select new ProductoDTO
                             {
                                 ID_Producto = p.ID_Producto,
                                 Descripcion_Categoria = p.Categoria != null ? p.Categoria.Nombre : "Sin categoría",
                                 Nombre = p.Nombre,
                                 Marca = p.Marcas.Nombre,
                                 Cantidad = p.Cantidad,
                                 Precio_Producto = p.Precio_Producto,
                                 Precio_Compra = p.Precio_Compra,
                                 Detalles = p.DetalleS,
                                 url_image = p.Image_URL

                             }).ToList();

            return productos.Any() ? productos : new List<ProductoDTO>();
        }

        public List<ProductoDTO> BuscarPorCategoria(int categoriaprodu)
        {

            return (from p in db.Producto
                    where p.ID_Categoria == categoriaprodu && p.Estado != 0
                    select new ProductoDTO
                    {

                        ID_Producto = p.ID_Producto,
                        EstadoProducto = p.Estado == 1 ? "Activo" : "Inactivo",
                        versucu = p.ID_Sucursal == 1 ? "Tienda Principal " : "Tienda Primaria" /*+ p.Sucursal.Nombre*/,
                        Descripcion_Categoria = p.Categoria.Nombre, // Accede al nombre de la categoría

                        Nombre = p.Nombre,
                        Marca = p.Marcas.Nombre,
                        Cantidad = p.Cantidad,
                        //Precio_Compra = p.Precio_Compra,
                        Precio_Producto = p.Precio_Producto,
                        Detalles = p.DetalleS // Asegúrate de incluir la propiedad si es relevante


                    }).ToList();

        }

        public ProductoDTO BuscarPorID(int nombreprodu)
        {

            return (from p in db.Producto
                    where p.ID_Producto == nombreprodu && p.Estado != 0
                    select new ProductoDTO
                    {

                        ID_Categoria = p.ID_Categoria,
                        ID_Sucursal = p.ID_Sucursal,

                        ID_Producto = p.ID_Producto,
                        EstadoProducto = p.Estado == 1 ? "Activo" : "Inactivo",
                        versucu = p.ID_Sucursal == 1 ? "Tienda Principal " : "Tienda Primaria",
                        Descripcion_Categoria = p.Categoria.Nombre, // Accede al nombre de la categoría

                        Nombre = p.Nombre,
                        ID_Marca = p.ID_Marca,
                        Cantidad = p.Cantidad,
                        //Precio_Compra = p.Precio_Compra,
                        Precio_Producto = p.Precio_Producto,
                        Precio_Compra = p.Precio_Compra,
                        url_image = p.Image_URL,
                        Detalles = p.DetalleS // Asegúrate de incluir la propiedad si es relevante


                    }).FirstOrDefault();

        }

        public List<ProductoDTO> BuscarPorIDLista(int nombreprodu) // NO SE EN ALGUN MOMENTO USE ESTO
        {

            return (from p in db.Producto
                    where p.ID_Producto == nombreprodu && p.Estado != 0
                    select new ProductoDTO
                    {

                        ID_Categoria = p.ID_Categoria,
                        ID_Sucursal = p.ID_Sucursal,

                        ID_Producto = p.ID_Producto,
                        EstadoProducto = p.Estado == 1 ? "Activo" : "Inactivo",
                        versucu = p.ID_Sucursal == 1 ? "Tienda Principal " : "Tienda Primaria",
                        Descripcion_Categoria = p.Categoria.Nombre, // Accede al nombre de la categoría

                        Nombre = p.Nombre,
                        Marca = p.Marcas.Nombre,
                        Cantidad = p.Cantidad,
                        //Precio_Compra = p.Precio_Compra,
                        Precio_Producto = p.Precio_Producto,
                        Detalles = p.DetalleS // Asegúrate de incluir la propiedad si es relevante


                    }).ToList();

        }

        public List<ProductoDTO> BuscarPorNombre(string nombreprodu)
        {

            return (from p in db.Producto
                    where p.Nombre == nombreprodu
                    select new ProductoDTO
                    {

                        ID_Producto = p.ID_Producto,
                        EstadoProducto = p.Estado == 1 ? "Activo" : "Inactivo",
                        versucu = p.ID_Sucursal == 1 ? "Tienda Principal" : "Tienda Primaria",
                        Descripcion_Categoria = p.Categoria.Nombre, // Accede al nombre de la categoría

                        Nombre = p.Nombre,
                        Marca = p.Marcas.Nombre,
                        Cantidad = p.Cantidad,
                        //Precio_Compra = p.Precio_Compra,
                        Precio_Producto = p.Precio_Producto,
                        Detalles = p.DetalleS // Asegúrate de incluir la propiedad si es relevante


                    }).ToList();

        }

        public List<ProductoDTO> ExtraerInfoCompra()
        {

            var resultado = db.Producto
                .Include(p => p.Categoria) // Incluye la relación con Categoria
                .Include(p => p.Sucursal)  // Incluye la relación con Sucursal
                .Where(p => p.Estado == 1) // Filtra productos activos
                .Select(p => new ProductoDTO // Cambia a ProductoDTO
                {
                    ID_Producto = p.ID_Producto,
                    ID_Sucursal = p.ID_Sucursal,
                    Nombre = p.Nombre,
                    url_image = p.Image_URL,
                    Precio_Producto = p.Precio_Producto,

                }).ToList();

            return resultado; // Esto ahora devuelve List<ProductoDTO>
        }


        public List<ProductoDTO> verproductos()
        {

            var resultado = db.Producto
                .Include(p => p.Categoria) // Incluye la relación con Categoria
                .Include(p => p.Sucursal)  // Incluye la relación con Sucursal
                .Where(p => p.Estado == 1) // Filtra productos activos
                .Select(p => new ProductoDTO // Cambia a ProductoDTO
                {
                    ID_Producto = p.ID_Producto,
                    Nombre = p.Nombre,
                    Marca = p.Marcas.Nombre,
                    Descripcion_Categoria = p.Categoria.Nombre, // Accede al nombre de la categoría
                    versucu = p.ID_Sucursal == 1 ? "Tienda Principal" : "Tienda Primaria",
                    Descripcion_Sucursal = p.Sucursal.Nombre,   // Accede al nombre de la sucursal
                    Cantidad = p.Cantidad,
                    url_image = p.Image_URL,
                    //Precio_Compra = p.Precio_Compra,
                    Precio_Producto = p.Precio_Producto,
                    Descripcion_Proveedor = p.Proveedor.Nombre, // Accede al nombre del proveedor
                    Detalles = p.DetalleS // Asegúrate de incluir la propiedad si es relevante

                    // ID_Marca = produ.ID_Marca,
                    // ID_TipoMoneda = produ.ID_TipoMoneda, NECESITO ACCDER A ESTAS NUEVAS VARIABLES, SUS SIMBOLOS Y NOMBRES
                    // ID_Unidad = produ.ID_Unidad

                }).ToList();

            return resultado; // Esto ahora devuelve List<ProductoDTO>
        }

        /*public List<string> ObtenerMarcas()
        {
            var marcasUnicas = db.Producto
                .Where(p => p.Estado == 1) // Filtra productos activos
                .Select(p => p.Marca.ToLower()) // Convierte las marcas a minúsculas para comparación
                .Distinct() // Elimina duplicados después de normalizar el caso
                .ToList();

            return marcasUnicas;
        }*/

        public int AgregarProducto(ProductoDTO produ)
        {

            try
            {

                Producto nuevoprodu = new Producto()
                {

                    Nombre = produ.Nombre,
                    Cantidad = produ.Cantidad,
                    Precio_Compra = produ.Precio_Compra,
                    Precio_Producto = produ.Precio_Producto,
                    ID_Marca = produ.ID_Marca,
                    DetalleS = produ.Detalles,
                    Image_URL = produ.url_image,
                    ID_Categoria = produ.ID_Categoria,
                    ID_Sucursal = produ.ID_Sucursal,
                    Estado = 1
                    // ID_Marca = produ.ID_Marca,
                    // ID_TipoMoneda = produ.ID_TipoMoneda,
                    // ID_Unidad = produ.ID_Unidad
                };

                db.Producto.Add(nuevoprodu);
                db.SaveChanges();


                return nuevoprodu.ID_Producto;

            }
            catch
            {

                return -1;


            }

        }

        public int ActualizarProductoExistente(ProductoDTO produ)
        {
            try
            {
                var newProdu = db.Producto.Find(produ.ID_Producto);
                if (newProdu == null)
                    return -1;

                newProdu.Cantidad = produ.Cantidad;


                db.Entry(newProdu).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
                Debug.WriteLine($"Cantidad: {newProdu.ID_Producto}, Precio_Compra: {newProdu.ID_Producto}");

                return newProdu.ID_Producto;
            }
            catch
            {
                return -1;
            }
        }


        public int ActulizarProducto(ProductoDTO produ)
        {
            try
            {
                // Verificar existencia del producto
                var productoExistente = db.Producto.Find(produ.ID_Producto);
                if (productoExistente == null) return -1;

                // Verificar que sucursal y categoría existan
                if (!db.Sucursal.Any(s => s.ID_Sucursal == produ.ID_Sucursal) ||
                    !db.Categoria.Any(c => c.ID_Categoria == produ.ID_Categoria))
                    return -2; // Nuevo código para referencias inválidas

                // Actualizar propiedades
                productoExistente.ID_Sucursal = produ.ID_Sucursal;
                productoExistente.ID_Categoria = produ.ID_Categoria;
                productoExistente.Nombre = produ.Nombre.Trim();
                productoExistente.ID_Marca = produ.ID_Marca;
                productoExistente.DetalleS = produ.Detalles?.Trim();
                productoExistente.Precio_Producto = produ.Precio_Producto;
                //productoExistente.Precio_Compra = produ.Precio_Compra;
                productoExistente.Image_URL = string.IsNullOrEmpty(produ.url_image) ? null : produ.url_image.Trim();
                //productoExistente.Cantidad = produ.Cantidad;

                db.Entry(productoExistente).State = EntityState.Modified;
                db.SaveChanges();

                return productoExistente.ID_Producto;
            }
            catch (Exception ex)
            {
                // Loggear el error
                System.Diagnostics.Debug.WriteLine($"Error al actualizar producto: {ex.Message}");
                return -1;
            }
        }
        public int KILLProductoExistente(ProductoDTO produ)
        {

            try
            {

                Producto newProdu = db.Producto.Find(produ.ID_Producto);

                if (newProdu is null)
                {

                    return -1;

                }

                newProdu.Estado = 0;

                db.Entry(newProdu).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();

                return newProdu.ID_Producto;

            }
            catch
            {

                return -1;


            }

        }

    }

}
