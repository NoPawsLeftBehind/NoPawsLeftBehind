using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Threading.Tasks;
using MySqlConnector;
using NoPawsLeftBehind.Database;

namespace NoPawsLeftBehind.Models
{
    public class Animal
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Picture { get; set; }
        public string Type { get; set; }
        public string Breed { get; set; }
        public string Gender { get; set; }
        public string Availability { get; set; }
        public int Age { get; set; }
        public int Weight { get; set; }
        public string Color { get; set; }
        public string Description { get; set; }
        public string News { get; set; }
        public DateTime DateCreated { get; set; }

        internal AppDb Db { get; set; }

        internal Animal(AppDb db)
        {
            Db = db;
        }
    }
}
