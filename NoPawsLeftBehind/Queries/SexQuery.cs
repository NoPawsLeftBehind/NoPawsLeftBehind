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
    public class SexQuery
    {
        internal AppDb Db { get; }

        public SexQuery(AppDb db)
        {
            Db = db;
        }

        public async Task<List<Sex>> AllSexesAsync()
        {

            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT 	*
                                FROM Genders";

            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }

        public async Task<List<Sex>> ReadAllAsync(DbDataReader reader)
        {
            var sexes = new List<Sex>();

            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var sex = new Sex()
                    {
                        sexID = reader.GetInt32(0),
                        sex = reader.GetString(1)
                    };
                    sexes.Add(sex);
                }
            }

            return sexes;
        }
    }
}
