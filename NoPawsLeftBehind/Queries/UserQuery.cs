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

        public async Task<IEnumerable<User>> ReadAllAsync()
        {
            List<User> userList = new List<User>();

            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT `userId`, `email`, `password`, `firstName`, `lastName`, `roleId` FROM `Users`;";

            MySqlDataReader reader = await cmd.ExecuteReaderAsync();
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    User user = new User();
                    user.userID = reader.GetInt32(0).ToString();
                    user.Email = reader.GetString(1);
                    user.Password = reader.GetString(2);
                    user.FirstName = reader.GetString(3);
                    user.LastName = reader.GetString(4);
                    user.RoleId = reader.GetInt32(5).ToString();

                    userList.Add(user);
                };
            }

            return userList;
        }

        public async Task<User> ReadOneAsync(string sEmail, string sPassword)
        {
            List<User> userList = new List<User>();

            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT `userId`, `email`, `firstName`, `lastName`, `roleId` FROM `Users` WHERE `email`=@email AND `password`=@password;";

            ApiHelper apiHelper = new ApiHelper();
            apiHelper.BindStringParam(cmd, Tuple.Create("@email", sEmail));
            apiHelper.BindStringParam(cmd, Tuple.Create("@password", sPassword));

            await cmd.ExecuteNonQueryAsync();

            MySqlDataReader reader = await cmd.ExecuteReaderAsync();
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    User user = new User();
                    user.userID = reader.GetInt32(0).ToString();
                    user.Email = reader.GetString(1);
                    user.FirstName = reader.GetString(2);
                    user.LastName = reader.GetString(3);
                    user.RoleId = reader.GetInt32(4).ToString();

                    userList.Add(user);
                };
            }

            if (userList.Count == 0)
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

            user.userID = cmd.LastInsertedId.ToString();
        }
    }
}
