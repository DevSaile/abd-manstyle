﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class ClienteDTO
    {
        public int ID_Cliente { get; set; }
        public string Nombre { get; set; }
        public int? Estado { get; set; }

        public string Telefono { get; set; }

        public string NombreEstado { get; set; }
    }
}
