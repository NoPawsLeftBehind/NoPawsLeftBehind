using NoPawsLeftBehind.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoPawsLeftBehind.Models
{
    public class FilterOptions
    {
        public FilterOptions()
        {
        }

        public List<AnimalType> AnimalTypes { get; set; }
        public List<Breed> Breeds { get; set; }
        public List<Disposition> Dispositions { get; set; }
    }
}
