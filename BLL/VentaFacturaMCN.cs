using DAL;
using Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity; // Para EF6


namespace BLL
{
    public class VentaFacturaMCN
    {
        private readonly bddVariedadesMansStyleEntities db;

        public VentaFacturaMCN()
        {
            db = new bddVariedadesMansStyleEntities();

        }

        public int AgregarVenta(Venta_FacturaDTO venta)
        {
            try
            {
                Venta_Factura newVenta = new Venta_Factura
                {
                    Estado = venta.Estado,
                    ID_Cliente = venta.ID_Cliente,
                    ID_Vendedor = venta.ID_Vendedor,
                    ID_Sucursal = venta.ID_Sucursal,
                    Fecha_Venta = venta.Fecha_Venta,
                    Cantidad = venta.Cantidad,
                    Subtotal = venta.Subtotal,
                    Total = venta.Total,
                    //PrecioProducto = venta.PrecioProducto,
                    Paga = venta.pagacon,
                    Cambio = venta.cambio
                };

                db.Venta_Factura.Add(newVenta);
                db.SaveChanges();
                return newVenta.ID_Venta;
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                return -1;
            }
        }

        public bool ActualizarVenta(Venta_FacturaDTO venta)
        {
            try
            {
                Venta_Factura existingVenta = db.Venta_Factura.Find(venta.ID_Venta);
                if (existingVenta == null) return false;

                existingVenta.Estado = venta.Estado;
                existingVenta.ID_Cliente = venta.ID_Cliente;
                existingVenta.ID_Vendedor = venta.ID_Vendedor;
                existingVenta.Fecha_Venta = venta.Fecha_Venta;
                existingVenta.Cantidad = venta.Cantidad;
                existingVenta.Subtotal = venta.Subtotal;
                existingVenta.Total = venta.Total;
                existingVenta.Paga = venta.pagacon;
                existingVenta.Cambio = venta.cambio;

                db.Entry(existingVenta).State = EntityState.Modified;
                db.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                return false;
            }
        }

        public bool EliminarVenta(Venta_FacturaDTO venta)
        {
            try
            {
                Venta_Factura existingVenta = db.Venta_Factura.Find(venta.ID_Venta);
                if (existingVenta == null) return false;

                existingVenta.Estado = venta.Estado;

                db.Entry(existingVenta).State = EntityState.Modified;
                db.SaveChanges();


                return true;
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                return false;
            }
        }

        public List<Venta_FacturaDTO> ObtenerTodasLasVentas()
        {
            try
            {
                return db.Venta_Factura.Select(venta => new Venta_FacturaDTO
                {
                    ID_Venta = venta.ID_Venta,
                    Estado = venta.Estado,
                    ID_Cliente = venta.ID_Cliente,
                    ID_Vendedor = venta.ID_Vendedor,
                    Fecha_Venta = venta.Fecha_Venta,
                    Cantidad = venta.Cantidad,
                    Subtotal = venta.Subtotal,
                    Total = venta.Total,
                    //PrecioProducto = venta.PrecioProducto,
                    pagacon = venta.Paga,
                    cambio = venta.Cambio

                }).ToList();
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                return new List<Venta_FacturaDTO>();
            }
        }

        public Venta_FacturaDTO ObtenerVentaPorId(int idVenta)
        {
            try
            {
                Venta_Factura venta = db.Venta_Factura.Find(idVenta);
                if (venta == null) return null;

                return new Venta_FacturaDTO
                {
                    ID_Venta = venta.ID_Venta,
                    Estado = venta.Estado,
                    ID_Cliente = venta.ID_Cliente,
                    ID_Vendedor = venta.ID_Vendedor,
                    Fecha_Venta = venta.Fecha_Venta,
                    Cantidad = venta.Cantidad,
                    Subtotal = venta.Subtotal,
                    Total = venta.Total,
                    //PrecioProducto = venta.PrecioProducto,
                    pagacon = venta.Paga,
                    cambio = venta.Cambio
                };
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                return null;
            }
        }

        // En estos metodos de abajo basicamente realizamos las busquedas

        public List<ClienteDTO> BuscarClientes(string valor)
        {
            return db.Cliente
                .Where(c => c.Estado == 1 && c.Nombre.ToLower().Contains(valor.ToLower()))
                .Select(c => new ClienteDTO
                {
                    ID_Cliente = c.ID_Cliente,
                    Nombre = c.Nombre,
                    //Estado = c.Estado,
                    // Otros campos relevantes
                }).ToList();
        }

        public List<ProductoDTO> BuscarProductos(string valor)
        {
            return db.Producto
                .Where(p => p.Estado == 1 && p.Nombre.ToLower().Contains(valor.ToLower()))
                .Select(p => new ProductoDTO
                {
                    ID_Producto = p.ID_Producto,
                    Nombre = p.Nombre,
                    Marca = p.Marcas.Nombre,
                    Cantidad = p.Cantidad,
                    Precio_Producto = p.Precio_Producto,
                    Detalles = p.DetalleS,
                    Descripcion_Categoria = p.ID_Categoria == 1 ? "Cosmeticos" : "Electronica",
                    Descripcion_Sucursal = p.ID_Sucursal == 1 ? "Tienda Principal" : "Tienda Primaria"

                }).ToList();
        }

        public List<EmpleadoDTO> BuscarVendedores(string valor)
        {
            return db.Vendedor
                .Where(v => v.Estado == 1 && v.Nombre.ToLower().Contains(valor.ToLower()))
                .Select(v => new EmpleadoDTO
                {
                    ID_Empleado = v.ID_Vendedor,
                    Nombre = v.Nombre,
                    NombreRol = v.ID_Rol == 1 ? "Administrador" : "Empleado",
                    NombreSucursal = v.ID_Sucursal == 1 ? "Tienda Principal" : "Tienda Primaria"
                    // Otros campos relevantes
                }).ToList();
        }

        public object BuscarRegistros(string criterio, string valor)
        {
            switch (criterio.ToLower())
            {
                case "cliente":
                    return BuscarClientes(valor);
                case "producto":
                    return BuscarProductos(valor);
                case "vendedor":
                    return BuscarVendedores(valor);
                default:
                    return null; // Si el criterio no es válido, retorna null o lanza una excepción.
            }
        }

        public int AgregarVentaPRO(Venta_FacturaDTO venta)
        {
            if (venta.Detalles == null || !venta.Detalles.Any())
                return -1; // No hay detalles de venta

            if (venta.ID_Cliente == null || venta.ID_Sucursal == null)
                return -1; // Falta información esencial

            using (var transaction = db.Database.BeginTransaction())
            {
                try
                {
                    Venta_Factura newVenta = new Venta_Factura
                    {
                        Estado = venta.Estado ?? 1,
                        ID_Cliente = venta.ID_Cliente,
                        ID_Vendedor = venta.ID_Vendedor,
                        Fecha_Venta = venta.Fecha_Venta ?? DateTime.Now,
                        Subtotal = venta.Subtotal ?? 0m,
                        Total = venta.Total ?? 0m,
                        Paga = venta.pagacon ?? 0m,
                        Cambio = venta.cambio ?? 0m,
                        Cantidad = venta.Cantidad,
                        ID_Sucursal = venta.ID_Sucursal
                    };

                    db.Venta_Factura.Add(newVenta);
                    db.SaveChanges();

                    foreach (var detalle in venta.Detalles)
                    {
                        var producto = db.Producto.FirstOrDefault(p => p.ID_Producto == detalle.ID_Producto);
                        if (producto == null || producto.Cantidad < detalle.Cantidad)
                        {
                            Console.WriteLine($"Producto ID {detalle.ID_Producto} no disponible o stock insuficiente.");
                            transaction.Rollback();
                            return -1;
                        }

                        producto.Cantidad -= detalle.Cantidad;
                        db.Entry(producto).State = EntityState.Modified;

                        Venta_Detalles newDetalle = new Venta_Detalles
                        {
                            ID_Venta = newVenta.ID_Venta,
                            ID_Producto = detalle.ID_Producto,
                            Cantidad = detalle.Cantidad,
                            PrecioProducto = detalle.PrecioProducto ?? 0m
                        };

                        db.Venta_Detalles.Add(newDetalle);
                    }

                    db.SaveChanges();
                    transaction.Commit();
                    return newVenta.ID_Venta;
                }
                catch (DbUpdateException ex)
                {
                    transaction.Rollback();
                    Console.WriteLine($"Error: {ex.InnerException.Message}");
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

        public List<Venta_FacturaDTO> ObtenerVentasPro() // Se supone que esto de aqui me devuelve la lista de todos los productos antes era obtenerVentasPorSucursal
        {
            var ventas = (from venta in db.Venta_Factura
                          join detalle in db.Venta_Detalles on venta.ID_Venta equals detalle.ID_Venta
                          join producto in db.Producto on detalle.ID_Producto equals producto.ID_Producto
                          select new Venta_FacturaDTO
                          {
                              ID_Venta = venta.ID_Venta,
                              Fecha_Venta = venta.Fecha_Venta,
                              NombreCliente = venta.Cliente.Nombre, // Supone que hay una relación con Cliente
                              NombreVendedor = venta.Vendedor.Nombre, // Supone que hay una relación con Empleado
                              NombreProducto = producto.Nombre,
                              Cantidad = detalle.Cantidad,
                              PrecioProducto = detalle.PrecioProducto,
                              Subtotal = detalle.Cantidad * detalle.PrecioProducto,
                              Total = venta.Total,
                              pagacon = venta.Paga,
                              cambio = venta.Cambio,
                              VentaHechaEN = venta.ID_Sucursal == 1 ? "Tienda Primaria" : "Tienda Secundaria"
                              //NombreSucursal = sucursal.Nombre // Supone que `Sucursal` tiene un atributo `Nombre`

                          }).ToList();

            return ventas;
        }

        public List<Venta_FacturaDTO> ObtenerVentasAgrupadas()
        {
            var ventas = db.Venta_Factura
                .Include(v => v.Cliente)
                .Include(v => v.Vendedor)
                .Include(v => v.Sucursal)
                .Include(v => v.Venta_Detalles.Select(d => d.Producto))
                .ToList() // ← Materializa la consulta antes de proyectar
                .Select(venta => new Venta_FacturaDTO
                {
                    ID_Venta = venta.ID_Venta,
                    Fecha_Venta = venta.Fecha_Venta,
                    NombreCliente = venta.Cliente?.Nombre ?? "Desconocido",
                    NombreVendedor = venta.Vendedor?.Nombre ?? "Desconocido",
                    NombreSucursal = venta.Sucursal?.Nombre ?? "No especificada",
                    Total = venta.Total,
                    pagacon = venta.Paga,
                    cambio = venta.Cambio,
                    VentaHechaEN = venta.ID_Sucursal == 1 ? "Tienda Primaria" : "Tienda Secundaria",
                    Detalles = venta.Venta_Detalles.Select(detalle => new Venta_DetallesDTO
                    {
                        ID_Producto = detalle.ID_Producto,
                        Cantidad = detalle.Cantidad,
                        PrecioProducto = detalle.PrecioProducto,
                        NombreProducto = detalle.Producto?.Nombre ?? "Producto desconocido"
                    }).ToList()
                })
                .ToList();

            return ventas;
        }



        public List<Venta_FacturaDTO> ObtenerVentasPorFechas(DateTime fechaInicio, DateTime fechaFin)
        {
            using (var db = new bddVariedadesMansStyleEntities())
            {
                var ventas = (from venta in db.Venta_Factura
                              join detalle in db.Venta_Detalles on venta.ID_Venta equals detalle.ID_Venta
                              join producto in db.Producto on detalle.ID_Producto equals producto.ID_Producto
                              join sucursal in db.Sucursal on producto.ID_Sucursal equals sucursal.ID_Sucursal
                              where venta.Fecha_Venta >= fechaInicio && venta.Fecha_Venta <= fechaFin
                              select new Venta_FacturaDTO
                              {
                                  ID_Venta = venta.ID_Venta,
                                  Fecha_Venta = venta.Fecha_Venta,
                                  NombreCliente = venta.Cliente.Nombre, // Supone relación con Cliente
                                  NombreVendedor = venta.Vendedor.Nombre, // Supone relación con Empleado
                                  NombreProducto = producto.Nombre,
                                  Cantidad = detalle.Cantidad,
                                  PrecioProducto = detalle.PrecioProducto,
                                  Subtotal = detalle.Cantidad * detalle.PrecioProducto,
                                  Total = venta.Total,
                                  pagacon = venta.Paga,
                                  cambio = venta.Cambio,
                                  NombreSucursal = sucursal.ID_Sucursal == 1 ? "Tienda Principal" : "Tienda Secundaria"
                              }).ToList();

                return ventas;
            }

        }


    }

}
