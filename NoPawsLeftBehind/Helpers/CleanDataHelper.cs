using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoPawsLeftBehind.Helpers
{
    public class CleanDataHelper
    {
        public string GetCleanString(MySqlDataReader reader, int index)
        {
            if (!reader.IsDBNull(index))
                return reader.GetString(index);

            return string.Empty;
        }

        public int GetCleanInt(MySqlDataReader reader, int index)
        {
            if (!reader.IsDBNull(index))
                return reader.GetInt32(index);

            return -1;
        }

        public double GetCleanDouble(MySqlDataReader reader, int index)
        {
            if (!reader.IsDBNull(index))
                return reader.GetDouble(index);

            return -1.0;
        }

        public bool GetCleanBoolean (MySqlDataReader reader, int index)
        {
            if (!reader.IsDBNull(index))
                return reader.GetBoolean(index);

            return false;
        }

        public DateTime GetCleanDateTime (MySqlDataReader reader, int index)
        {
            if (!reader.IsDBNull(index))
                return reader.GetDateTime(index);

            return DateTime.UnixEpoch;
        }
    }
}
