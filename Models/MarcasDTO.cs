﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class MarcasDTO
    {

        public int ID_Marca { get; set; }
        public string Nombre { get; set; }

        public int Estado { get; set; } // 1 = Activo, 0 = Inactivo
    }
}
