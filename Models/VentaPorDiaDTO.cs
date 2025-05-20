using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class VentaPorDiaDTO
    {

        public string Name { get; set; } // Día en texto (Lun, Mar, etc.)
        public decimal? Sales { get; set; } // Total vendido ese día

    }
}
