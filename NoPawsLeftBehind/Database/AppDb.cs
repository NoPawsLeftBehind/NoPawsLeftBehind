using Microsoft.Extensions.Configuration;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoPawsLeftBehind.Database
{
    public class AppDb : IDisposable
    {    
        public AppDb(string connectionString)
        {
            Connection = new MySqlConnection(connectionString);
        }

        public MySqlConnection Connection { get; }

        public void Dispose() => Connection.Dispose();
    }
}
