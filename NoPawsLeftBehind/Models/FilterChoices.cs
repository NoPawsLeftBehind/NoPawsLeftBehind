using NoPawsLeftBehind.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoPawsLeftBehind.Models
{
    public class FilterChoices
    {
        public FilterChoices()
        {
        }

        public string AnimalType { get; set; }
        public string Breed { get; set; }
        public string Disposition { get; set; }
    }
}
