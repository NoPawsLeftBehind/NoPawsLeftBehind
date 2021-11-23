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
    public class ColorQuery
    {
        internal AppDb Db { get; }

        public ColorQuery(AppDb db)
        {
            Db = db;
        }

        public async Task<List<Color>> AllColorsAsync()
        {

            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT 	*
                                FROM Colors";

            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }

        public async Task<List<Color>> ReadAllAsync(DbDataReader reader)
        {
            var colors = new List<Color>();

            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var color = new Color()
                    {
                        colorID = reader.GetInt32(0),
                        color = reader.GetString(1)
                    };
                    colors.Add(color);
                }
            }

            return colors;
        }
    }
}
