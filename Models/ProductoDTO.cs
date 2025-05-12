using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class ProductoDTO
    {

        public int ID_Producto { get; set; }
        public int? ID_Categoria { get; set; }
        public string Nombre { get; set; }
        public string Marca { get; set; }
        public int? Cantidad { get; set; }
        public decimal? Precio_Compra { get; set; }
        public decimal? Precio_Producto { get; set; }
        public int? ID_Sucursal { get; set; }
        public string Detalles { get; set; }
        public int? Estado { get; set; }

        public string EstadoProducto { get; set; }

        public string url_image { get; set; }

        public int? ID_Proveedor { get; set; }


        /* VARIBALES PARA PROVEEDOR*/

        public string Descripcion_Proveedor { get; set; }

        /*FIN VARIBALES PROVEEDOR*/


        /* VARIBALES PARA SUCURSAL*/

        public string Descripcion_Sucursal { get; set; }
        public string versucu { get; set; }

        /*FIN VARIBALES SUCURSAL*/



        /* VARIABLES CATEGORIA */

        public string Descripcion_Categoria { get; set; }


        /* FIN VARIABLES CATEGORIA*/


        /*public CategoriaDTO Categoria { get; set; }*/


        /*AQUI INICIAN LAS NUEVAS VARIABLES PARA LAS NUEVAS TABLES*/

        public int ID_Marca { get; set; }
        public int ID_TipoMoneda { get; set; }
        public int ID_Unidad { get; set; }

        public string Unidad { get; set; }

        public string TipoMoneda { get; set; }


    }

}
