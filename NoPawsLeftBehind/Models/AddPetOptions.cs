using NoPawsLeftBehind.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoPawsLeftBehind.Models
{
    public class AddPetOptions
    {
        public AddPetOptions()
        {
        }

        public List<AnimalType> AnimalTypes { get; set; }
        public List<Breed> Breeds { get; set; }
        public List<Sex> Sexes { get; set; }
        public List<Availability> Availabilities { get; set; }
        public List<Color> Colors { get; set; }
        public List<Disposition> Dispositions { get; set; }
    }
}
