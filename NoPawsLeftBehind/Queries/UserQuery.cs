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
            cmd.CommandText = @"SELECT `userID`, `email`, `firstName`, `lastName` FROM `Users`;";

            CleanDataHelper cleanDataHelper = new CleanDataHelper();

            try
            {
                MySqlDataReader reader = await cmd.ExecuteReaderAsync();
                using (reader)
                {
                    while (await reader.ReadAsync())
                    {
                        User user = new User();
                        user.userID = cleanDataHelper.GetCleanString(reader, 0);
                        user.email = cleanDataHelper.GetCleanString(reader, 1);
                        user.firstName = cleanDataHelper.GetCleanString(reader, 2);
                        user.lastName = cleanDataHelper.GetCleanString(reader, 3);

                        userList.Add(user);
                    };
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
            }

            return userList;
        }

        public async Task<User> ReadOneAsync(string sEmail, string sPassword)
        {
            List<User> userList = new List<User>();

            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT `userId`, `email`, `firstName`, `lastName` FROM `Users` WHERE `userId` = @userId;";

            ApiHelper apiHelper = new ApiHelper();
            apiHelper.BindStringParam(cmd, Tuple.Create("@userId", sEmail));

            await cmd.ExecuteNonQueryAsync();

            CleanDataHelper cleanDataHelper = new CleanDataHelper();

            MySqlDataReader reader = await cmd.ExecuteReaderAsync();
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    User user = new User();
                    user.userID = cleanDataHelper.GetCleanString(reader, 0);
                    user.email = cleanDataHelper.GetCleanString(reader, 1);
                    user.firstName = cleanDataHelper.GetCleanString(reader, 2);
                    user.lastName = cleanDataHelper.GetCleanString(reader, 3);

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
            cmd.CommandText = @"INSERT INTO `Users` (`userID`, `Email`, `FirstName`, `LastName`) VALUES " +
                "(@userID, @email, @firstname, @lastname);";

            ApiHelper apiHelper = new ApiHelper();
            apiHelper.BindStringParam(cmd, Tuple.Create("@userID", user.userID));
            apiHelper.BindStringParam(cmd, Tuple.Create("@email", user.email));
            apiHelper.BindStringParam(cmd, Tuple.Create("@firstname", user.firstName));
            apiHelper.BindStringParam(cmd, Tuple.Create("@lastname", user.lastName));

            await cmd.ExecuteNonQueryAsync();

            user.userID = cmd.LastInsertedId.ToString();
        }

        public async Task<bool> ExistsAsync(string userID)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT COUNT(*) FROM `Users` WHERE `userID` = @userID;";

            ApiHelper apiHelper = new ApiHelper();
            apiHelper.BindStringParam(cmd, Tuple.Create("@userID", userID));

            return (long)await cmd.ExecuteScalarAsync() > 0;
        }
    }
}
