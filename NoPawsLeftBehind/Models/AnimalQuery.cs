﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Threading.Tasks;
using MySqlConnector;
using System.Data.Common;
using NoPawsLeftBehind.Database;

namespace NoPawsLeftBehind.Models
{
    public class AnimalQuery
    {
        internal AppDb Db { get; }

        public AnimalQuery(AppDb db)
        {
            Db = db;
        }

        public async Task<List<Animal>> AllAnimalsAsync()
        {

            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"Select animalID, name, typeID, breedID, genderID FROM Animals;";

            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }

        public async Task<List<Animal>> ReadAllAsync(DbDataReader reader)
        {
            var animals = new List<Animal>();

            using(reader)
            {
                while (await reader.ReadAsync())
                {
                    var animal = new Animal()
                    {
                        Id = reader.GetInt32(0),
                        Name = reader.GetString(1),
                        Type = reader.GetString(2),
                        Breed = reader.GetString(3),
                        Gender = reader.GetString(4)
                    };
                    animals.Add(animal);
                }
            }

            return animals;
        }

    }
}