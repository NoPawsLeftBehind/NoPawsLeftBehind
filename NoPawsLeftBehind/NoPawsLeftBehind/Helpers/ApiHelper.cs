using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace NoPawsLeftBehind.Helpers
{
    public class ApiHelper
    {
        public void BindIntParam(MySqlCommand cmd, Tuple<string, int> parameter)
        {
            MySqlParameter mySqlParameter = new MySqlParameter();
            mySqlParameter.ParameterName = parameter.Item1;
            mySqlParameter.DbType = DbType.Int32;
            mySqlParameter.Value = parameter.Item2;

            cmd.Parameters.Add(mySqlParameter);
        }

        public void BindDoubleParam(MySqlCommand cmd, Tuple<string, double> parameter)
        {
            MySqlParameter mySqlParameter = new MySqlParameter();
            mySqlParameter.ParameterName = parameter.Item1;
            mySqlParameter.DbType = DbType.Double;
            mySqlParameter.Value = parameter.Item2;

            cmd.Parameters.Add(mySqlParameter);
        }

        public void BindStringParam(MySqlCommand cmd, Tuple<string, string> parameter)
        {
            MySqlParameter mySqlParameter = new MySqlParameter();
            mySqlParameter.ParameterName = parameter.Item1;
            mySqlParameter.DbType = DbType.String;
            mySqlParameter.Value = parameter.Item2;

            cmd.Parameters.Add(mySqlParameter);
        }
    }
}
