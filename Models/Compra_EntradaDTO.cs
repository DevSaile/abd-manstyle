using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Compra_EntradaDTO
    {

        public int ID_Entrada { get; set; }

        public int? Estado { get; set; }

        public DateTime? Fecha_Compra { get; set; }

        public decimal? Precio_Compra { get; set; }

        public int? CantidadCompra { get; set; }



        /*VARIABLES PARA TABLA PRODUCTOS EN COMPRA_ENTRADA*/
        public int? ID_Producto { get; set; }

        public string Nombre_Producto { get; set; } // Propiedad para el nombre del producto*/

        public string Marca { get; set; }

        public int? Cantidad { get; set; }

        public decimal? Precio_Producto { get; set; }

        public string Detalles { get; set; }

        /* FIN DE LAS VARIABLES DE PRODUCTOS */


        /* INICIO DE LAS VARIABLES DE SUCURSAL */

        public string Nombre_Sucursal { get; set; }
        public int ID_Sucursal { get; set; }

        public string Descripcion_Sucursal { get; set; }

        /* FIN DE LAS VARIABLES DE SUCURSAL */


        /* INICIO DE LAS VARIABLES DE CATEGORIA */

        public string Nombre_Categoria { get; set; }


        /* FIN DE LAS VARIABLES DE CATEGORIA */


        /*AQUI ESTARAN LAS NUEVAS VARIABLES PARA LAS NUEVAS TABLAS*/

        public int ID_TipoPago { get; set; }
        public int ID_TipoMoneda { get; set; }

        public int ID_Proveedor { get; set; }


        public string NombreProveedor { get; set; }
        public string TipoPago { get; set; }
        public string TipoMoneda { get; set; }

        public List<CompraDetalleDTO> DetallesCompra { get; set; } = new List<CompraDetalleDTO>();

    }

}
