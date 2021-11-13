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
    public class DispositionQuery
    {
        internal AppDb Db { get; }

        public DispositionQuery(AppDb db)
        {
            Db = db;
        }

        public async Task<List<Disposition>> AllDispositionsAsync()
        {

            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT 	*
                                FROM Dispositions";

            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }

        //TODO: Add in pull of a list of dispositions for a single animal
        public async Task<List<Disposition>> AnimalDispositionsAsync(int id)
        {
            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT d.dispositionID,
		                                d.disposition
                                FROM Dispositions d
                                LEFT JOIN Animals_Dispositions ad ON ad.dispositionID = d.dispositionID
                                WHERE ad.animalID = @id;";

            ApiHelper apiHelper = new ApiHelper();
            apiHelper.BindIntParam(cmd, Tuple.Create("@id", id));

            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }

        public async Task<List<Disposition>> ReadAllAsync(DbDataReader reader)
        {
            var dispositions = new List<Disposition>();

            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var disposition = new Disposition()
                    {
                        dispositionID = reader.GetInt32(0),
                        disposition = reader.GetString(1)
                    };
                    dispositions.Add(disposition);
                }
            }

            return dispositions;
        }

        
    }
}
