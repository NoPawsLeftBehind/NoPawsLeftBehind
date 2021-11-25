using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoPawsLeftBehind.Models
{
    public class CreateAnimal
    {
        public CreateAnimal()
        {

        }

        public string Name { get; set; }
        public string Description { get; set; }
        public string Picture { get; set; }
        public int Type { get; set; }
        public int Breed { get; set; }
        public int Gender { get; set; }
        public int Availability { get; set; }
        public int Age { get; set; }
        public int Weight { get; set; }
        public List <int> Colors { get; set; }
        public string News { get; set; }
        public List<int> Dispositions { get; set; }
    }
}
