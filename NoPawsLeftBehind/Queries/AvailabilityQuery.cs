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
    public class AvailabilityQuery
    {
        internal AppDb Db { get; }

        public AvailabilityQuery(AppDb db)
        {
            Db = db;
        }

        public async Task<List<Availability>> AllAvailabilitiesAsync()
        {

            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT 	*
                                FROM Availability";

            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }

        public async Task<List<Availability>> ReadAllAsync(DbDataReader reader)
        {
            var availabilities = new List<Availability>();

            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var avail = new Availability()
                    {
                        availabilityID = reader.GetInt32(0),
                        availability = reader.GetString(1)
                    };
                    availabilities.Add(avail);
                }
            }

            return availabilities;
        }
    }
}
