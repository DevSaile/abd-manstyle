using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Models;
using DAL;
using System.Data.Entity.Infrastructure;
using System.Data.Entity;

namespace BLL
{
    public class Compra_EntradaMCN
    {
        private readonly bddVariedadesMansStyleEntities db;

        public Compra_EntradaMCN()
        {
            db = new bddVariedadesMansStyleEntities();

        }

        /*public bool AgregarProducto(Compra_EntradaDTO compraentra)
        {

            try
            {

                Compra_Entrada nuevaentrada = new Compra_Entrada()
                {

                    Estado = compraentra.Estado,
                    ID_Producto = compraentra.ID_Producto,
                    Precio_Compra = compraentra.Precio_Compra,
                    CantidadCompra = compraentra.CantidadCompra,
                    Fecha_Compra = compraentra.Fecha_Compra

                };

                db.Compra_Entrada.Add(nuevaentrada);
                db.SaveChanges();

                return true;

            }
            catch
            {

                return false;

            }

        }*/

        /*public List<Compra_EntradaDTO> VerRegistroCompraEntradaFechas(DateTime fechaInicio, DateTime fechaFin)
        {

            var resultado =

                from ce in db.Compra_Entrada
                join p in db.Producto on ce.ID_Producto equals p.ID_Producto
                join ct in db.Categoria on p.ID_Categoria equals ct.ID_Categoria
                join su in db.Sucursal on p.ID_Sucursal equals su.ID_Sucursal
                where ce.Fecha_Compra >= fechaInicio && ce.Fecha_Compra <= fechaFin
                select new Compra_EntradaDTO
                {
                    ID_Entrada = ce.ID_Entrada,
                    Nombre_Categoria = ct.Nombre,
                    ID_Producto = p.ID_Producto,
                    Nombre_Producto = p.Nombre,
                    Marca = p.Marca,
                    CantidadCompra = ce.CantidadCompra,
                    Precio_Compra = ce.Precio_Compra,
                    Detalles = p.Detalles,
                    Descripcion_Sucursal = su.ID_Sucursal == 1 ? "Tienda Principal" : "Tienda Secundaria", // Ajuste en el texto
                    Nombre_Sucursal = su.Nombre,
                    Fecha_Compra = ce.Fecha_Compra ?? DateTime.MinValue // Manejo de nulos en Fecha_Compra
                };

            return resultado.ToList();

        }*/



        /*public List<Compra_EntradaDTO> VerRegistroCompraEntrada()
        {


            var resultado =

                from ce in db.Compra_Entrada
                join p in db.Producto on ce.ID_Producto equals p.ID_Producto
                join ct in db.Categoria on p.ID_Categoria equals ct.ID_Categoria
                join su in db.Sucursal on p.ID_Sucursal equals su.ID_Sucursal

                select new Compra_EntradaDTO
                {

                    ID_Entrada = ce.ID_Entrada,

                    Nombre_Categoria = ct.Nombre,
                    ID_Producto = p.ID_Producto,
                    Nombre_Producto = p.Nombre,
                    Marca = p.Marca,
                    CantidadCompra = ce.CantidadCompra,
                    Precio_Compra = ce.Precio_Compra, // aqui modifique esto
                    //Precio_Producto = p.Precio_Producto, segun mi logica no hay que usar info del producto en la compra entrada
                    Detalles = p.Detalles,
                    Descripcion_Sucursal = su.ID_Sucursal == 1 ? "Tienda Principal" : "Tienda Primaria",
                    Nombre_Sucursal = su.Nombre,

                    Fecha_Compra = ce.Fecha_Compra.HasValue ? ce.Fecha_Compra.Value : DateTime.MinValue
                };

            return resultado.ToList();


             HAY OTRA MANERA MAS FACIL DE HACER ESTA WEA PERO ME COMPLIQUE LA VIDA 


        }*/

        public int AgregarCompraPRO(Compra_EntradaDTO compra)
        {
            if (compra.DetallesCompra == null || !compra.DetallesCompra.Any())
                return -1; // No hay detalles de compra


            using (var transaction = db.Database.BeginTransaction())
            {
                try
                {
                    Compra_Entrada nuevaCompra = new Compra_Entrada
                    {
                        Estado = compra.Estado ?? 1,
                        //ID_Proveedor = compra.ID_Proveedor,
                        Fecha_Compra = compra.Fecha_Compra ?? DateTime.Now,
                        Precio_Compra = compra.Precio_Compra ?? 0m,
                        Cantidad = compra.CantidadCompra ?? 0,
                        //ID_Sucursal = compra.ID_Sucursal, esto de aqui se elimina
                        //ID_TipoPago = compra.ID_TipoPago, esto de aqui se queda
                        //ID_TipoMoneda = compra.ID_TipoMoneda esto de aqui se queda
                    };

                    db.Compra_Entrada.Add(nuevaCompra);
                    db.SaveChanges();

                    foreach (var detalle in compra.DetallesCompra)
                    {
                        var producto = db.Producto.FirstOrDefault(p => p.ID_Producto == detalle.ID_Producto);
                        if (producto == null)
                        {
                            Console.WriteLine($"Producto ID {detalle.ID_Producto} no encontrado.");
                            transaction.Rollback();
                            return -1;
                        }

                        producto.Cantidad += detalle.Cantidad; // Incrementar stock
                        db.Entry(producto).State = EntityState.Modified;

                        Compra_Detalles nuevoDetalle = new Compra_Detalles
                        {
                            ID_Entrada = nuevaCompra.ID_Entrada,
                            ID_Producto = detalle.ID_Producto,
                            Cantidad = detalle.Cantidad,
                            Precio_Compra = detalle.Precio_Compra,
                            ID_Sucursal = producto.ID_Sucursal
                        };

                        db.Compra_Detalles.Add(nuevoDetalle);
                    }

                    db.SaveChanges();
                    transaction.Commit();
                    return nuevaCompra.ID_Entrada;
                }
                catch (DbUpdateException ex)
                {
                    transaction.Rollback();
                    Console.WriteLine($"Error en BD: {ex.InnerException?.Message}");
                    return -1;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    Console.WriteLine($"Error General: {ex.Message}");
                    return -1;
                }
            }
        }

       public List<Compra_EntradaDTO> ObtenerComprasAgrupadas()
        {
            var compras = db.Compra_Entrada
                .Include(c => c.Proveedor)
                .Include(c => c.Sucursal)
                .Include(c => c.Compra_Detalles.Select(d => d.Producto))
                .ToList() // ← Materializa la consulta antes de proyectar
                .Select(compra => new Compra_EntradaDTO
                {
                    ID_Entrada = compra.ID_Entrada,
                    Fecha_Compra = compra.Fecha_Compra,
                    NombreProveedor = compra.Proveedor?.Nombre ?? "Desconocido",
                    Nombre_Sucursal = compra.Sucursal?.Nombre ?? "No especificada",
                    //TipoPago = db.TipoPago.FirstOrDefault(tp => tp.ID_TipoPago == compra.ID_TipoPago)?.Descripcion ?? "No especificado",
                    //TipoMoneda = db.TipoMoneda.FirstOrDefault(tm => tm.ID_TipoMoneda == compra.ID_TipoMoneda)?.Descripcion ?? "No especificado",
                    Precio_Compra = compra.Precio_Compra,
                    CantidadCompra = compra.Cantidad,
                    DetallesCompra = compra.Compra_Detalles.Select(detalle => new CompraDetalleDTO
                    {
                        ID_Producto = detalle.ID_Producto,
                        Cantidad = detalle.Cantidad,
                        Precio_Compra = detalle.Precio_Compra,
                        NombreProducto = detalle.Producto?.Nombre ?? "Producto desconocido"
                    }).ToList()
                })
                .ToList();

            return compras;
        }

    }

}
