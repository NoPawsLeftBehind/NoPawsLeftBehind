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
    public class UserQuery
    {
        public UserQuery(AppDb db)
        {
            Db = db;
        }

        public AppDb Db { get; }

        public async Task<IReadOnlyList<User>> ReadAllAsync(DbDataReader reader)
        {
            List<User> userList = new List<User>();

            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT * FROM `Users`;";

            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    User user = new User();
                    user.Id = reader.GetInt32(0).ToString();
                    user.Email = reader.GetString(1);
                    user.Password = reader.GetString(2);

                    userList.Add(user);
                };
            }

            return userList.AsReadOnly();
        }

        public async Task<User> ReadOneAsync(DbDataReader reader, string sUsername, string sPassword)
        {
            List<User> userList = null;

            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT * FROM `Users` WHERE `username`=@username AND `password`=password;";

            MySqlParameter parameters = new MySqlParameter();


            cmd.Parameters.Add("Lindsey");

            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    User user = new User();
                    user.Id = reader.GetInt32(0).ToString();
                    user.Email = reader.GetString(1);
                    user.Password = reader.GetString(2);

                    userList.Add(user);
                };
            }

            if (userList.Count <= 0)
                return null;

            return userList[0];
        }

        public async Task InsertAsync(User user)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"INSERT INTO `Users` (`Email`, `Password`, `FirstName`, `LastName`, `RoleId`) VALUES " + 
                "(@email, @password, @firstname, @lastname, @roleid);";

            ApiHelper apiHelper = new ApiHelper();
            apiHelper.BindStringParam(cmd, Tuple.Create("@email", user.Email));
            apiHelper.BindStringParam(cmd, Tuple.Create("@password", user.Password));
            apiHelper.BindStringParam(cmd, Tuple.Create("@firstname", user.FirstName));
            apiHelper.BindStringParam(cmd, Tuple.Create("@lastname", user.LastName));
            apiHelper.BindIntParam(cmd, Tuple.Create("@roleid", Int32.Parse(user.RoleId)));

            await cmd.ExecuteNonQueryAsync();

            user.Id = cmd.LastInsertedId.ToString();
        }
    }
}
