using NoPawsLeftBehind.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoPawsLeftBehind.Models
{
    public class Breed
    {
        public Breed()
        {
        }

        public int breedID { get; set; }
        public string breedName { get; set; }
        public int typeID { get; set; }
    }
}
