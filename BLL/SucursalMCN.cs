using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Models;
using DAL;

namespace BLL
{
    public class SucursalMCN
    {

        private readonly bddVariedadesMansStyleEntities db;

        public SucursalMCN()
        {

            db = new bddVariedadesMansStyleEntities();
        }

        public List<SucursalDTO> ObtenerSucursales()
        {

            return db.Sucursal.Select(s => new SucursalDTO
            {

                ID_Sucursal = s.ID_Sucursal,
                Nombre = (s.ID_Sucursal == 1 ? "Tienda Principal" : s.ID_Sucursal == 2 ? "Tienda Primaria" : " ") /*+ s.Nombre*/,

            }).ToList();

        }

        public int ObtenerSucursalID(int? idempleado) 
        {
            var sucu = (from v in db.Vendedor
                        where v.ID_Vendedor == idempleado
                        select v.ID_Sucursal).FirstOrDefault();

            return sucu ?? -1;
        }

        public string DevolverSucursalProductos(int? idsucuproducto) 
        {
            var sucu = (from p in db.Producto
                        where p.ID_Producto == idsucuproducto
                        select p.ID_Sucursal).FirstOrDefault();

            String devolver = sucu == 0 ? "Tienda Principal" : "Tienda Primaria";

            return devolver;
        }

        public string DevolverMarcaProductos(int? idsucuproducto) 
        {
            var sucu = (from p in db.Producto
                        where p.ID_Producto == idsucuproducto
                        select p.Marcas.Nombre).FirstOrDefault();

            //String devolver = sucu == 0 ? "Tienda Principal" : "Tienda Primaria";

            return sucu;
        }


        public List<SucursalDTO> ObtenerSucursalesPorID(int? idsucuproducto) 
        {
            if (!idsucuproducto.HasValue)
                return new List<SucursalDTO>();

            // Realiza la consulta
            var resultado = db.Sucursal
                .Where(c => c.Producto.Any(p => p.ID_Sucursal == idsucuproducto)) 
                .Select(c => new SucursalDTO
                {
                    ID_Sucursal = c.ID_Sucursal,
                    Nombre = c.Nombre, 

                }).ToList();

            return resultado;
        }

        public Dictionary<string, decimal> ObtenerTotalesSucursal(int idSucursal)
        {
            decimal totalGanancias = db.Venta_Factura
                .Where(vf => vf.ID_Sucursal == idSucursal)
                .Join(db.Venta_Detalles, vf => vf.ID_Venta, vd => vd.ID_Venta, (vf, vd) => new { vf, vd })
                .Sum(v => (decimal)(v.vd.Cantidad * v.vd.PrecioProducto));

            int totalMarcas = db.Marcas
                .Select(M => M.ID_Marca)
                .Distinct()
                .Count();

            return new Dictionary<string, decimal>
            {
                { "Clientes", db.Cliente.Count() },
                { "Empleados", db.Vendedor.Count(v => v.ID_Sucursal == idSucursal) }, // Filtramos empleados por sucursal
                { "Productos", db.Producto.Count(p => p.ID_Sucursal == idSucursal) },
                { "Ventas", db.Venta_Factura.Count(vf => vf.ID_Sucursal == idSucursal) }, // Conteo directo por sucursal
                { "GananciasTotales", totalGanancias },
                { "Marcas", totalMarcas }
            };
        }




        public List<ProductoPorCategoriaDTO> ObtenerProductosPorCategoria(int idSucursal)
        {
            return db.Producto
                .Where(p => p.ID_Sucursal == idSucursal)
                .GroupBy(p => p.Categoria.Nombre)
                .Select(g => new ProductoPorCategoriaDTO
                {
                    Categoria = g.Key,
                    Cantidad = g.Count()
                }).ToList();
        }


        public List<ProductoDTO> ObtenerTop5MayorStock(int idSucursal)
        {
            return db.Producto
                .Where(p => p.ID_Sucursal == idSucursal && p.Estado == 1)
                .OrderByDescending(p => p.Cantidad)
                .Take(5)
                .Select(p => new ProductoDTO
                {
                    Nombre = p.Nombre,
                    Cantidad = p.Cantidad
                }).ToList();
        }


        public List<ProductoDTO> ObtenerProductosBajoStock(int idSucursal, int umbral)
        {
            return db.Producto
                .Where(p => p.ID_Sucursal == idSucursal && p.Estado == 1 && p.Cantidad < umbral)
                .Select(p => new ProductoDTO
                {
                    Nombre = p.Nombre,
                    Cantidad = p.Cantidad
                }).ToList();
        }
        // Método en el servicio
        // Método en el servicio
        public List<VentaPorDiaDTO> ObtenerVentasPorDiaSemana(int idSucursal)
        {
            string[] diasSemana = { "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado" };

            var ventas = db.Venta_Factura
                .Where(v => v.ID_Sucursal == idSucursal)
                .ToList(); // Fetch data into memory

            var result = ventas
                .GroupBy(v => v.Fecha_Venta.Value.DayOfWeek)
                .Select(g => new VentaPorDiaDTO
                {
                    Name = diasSemana[(int)g.Key],
                    Sales = g.Sum(v => v.Total)
                })
                .OrderBy(x => Array.IndexOf(diasSemana, x.Name))
                .ToList();

            return result;
        }


    }

}
