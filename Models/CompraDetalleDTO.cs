using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class CompraDetalleDTO
    {
        public int ID_Detalles { get; set; }
        public int ID_Entrada { get; set; }
        public int ID_Producto { get; set; }
        public int Cantidad { get; set; }
        public decimal Precio_Compra { get; set; }

        public string NombreProducto { get; set; }

    }
}
