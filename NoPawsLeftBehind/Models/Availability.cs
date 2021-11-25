using NoPawsLeftBehind.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoPawsLeftBehind.Models
{
    public class Availability
    {
        public Availability()
        {
        }

        public int availabilityID { get; set; }
        public string availability { get; set; }
    }
}
