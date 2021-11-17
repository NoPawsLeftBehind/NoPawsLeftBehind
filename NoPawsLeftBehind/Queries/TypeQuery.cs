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
    public class AnimalTypeQuery
    {
        internal AppDb Db { get; }

        public AnimalTypeQuery(AppDb db)
        {
            Db = db;
        }

        public async Task<List<AnimalType>> AllTypesAsync()
        {

            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT 	*
                                FROM AnimalTypes";

            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }

        public async Task<List<AnimalType>> ReadAllAsync(DbDataReader reader)
        {
            var types = new List<AnimalType>();

            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var type = new AnimalType()
                    {
                        typeID = reader.GetInt32(0),
                        typeName = reader.GetString(1)
                    };
                    types.Add(type);
                }
            }

            return types;
        }
    }
}
