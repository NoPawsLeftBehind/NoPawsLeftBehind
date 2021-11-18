using NoPawsLeftBehind.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoPawsLeftBehind.Models
{
    public class AnimalType
    {
        public AnimalType()
        {
        }

        public int typeID { get; set; }
        public string typeName { get; set; }
    }
}
