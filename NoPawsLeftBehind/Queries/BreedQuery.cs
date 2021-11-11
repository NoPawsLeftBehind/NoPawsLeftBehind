using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using NoPawsLeftBehind.Database;
using NoPawsLeftBehind.Helpers;
using NoPawsLeftBehind.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;

namespace NoPawsLeftBehind.Queries
{
    public class BreedQuery
    {
        internal AppDb Db { get; }

        public BreedQuery(AppDb db)
        {
            Db = db;
        }

        public async Task<List<Breed>> AllBreedsAsync()
        {

            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT 	*
                                FROM Breeds a";

            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }

        public async Task<List<Breed>> ReadAllAsync(DbDataReader reader)
        {
            var breeds = new List<Breed>();

            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var breed = new Breed()
                    {
                        breedID = reader.GetInt32(0),
                        breedName = reader.GetString(1),
                        typeID = reader.GetInt32(2)
                    };
                    breeds.Add(breed);
                }
            }

            return breeds;
        }
    }
}
