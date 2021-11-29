using MySqlConnector;
using NoPawsLeftBehind.Database;
using NoPawsLeftBehind.Helpers;
using NoPawsLeftBehind.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoPawsLeftBehind.Queries
{
    public class FavoriteQuery
    {
        public FavoriteQuery(AppDb db)
        {
            Db = db;
        }

        public AppDb Db { get; }

        public async Task<IEnumerable<Animal>> ReadFavoritesAsync(string sUserId)
        {
            List<Animal> animalList = new List<Animal>();

            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT 	a.animalID, a.name, IFNULL(a.picture, '') as picture, t.typeName, 
                                        b.breedName, g.gender, av.availability, age, weight, c.color,
                                        description, news, dateCreated
                                        FROM Animals a
                                        LEFT JOIN AnimalTypes t ON a.typeID = t.typeID
                                        LEFT JOIN Breeds b ON a.breedID = b.breedID
                                        LEFT JOIN Genders g ON a.genderID = g.genderID
                                        LEFT JOIN Availability av on a.availabilityID = av.availabilityID
                                        LEFT JOIN Colors c on a.colorID = c.colorID
                                        INNER JOIN Users_Animals ua on a.animalID = ua.animalID 
                                        WHERE ua.userID = @userID AND av.availability != 'Adopted';";

            ApiHelper apiHelper = new ApiHelper();
            apiHelper.BindStringParam(cmd, Tuple.Create("@userID", sUserId));

            CleanDataHelper cleanDataHelper = new CleanDataHelper();

            await cmd.ExecuteNonQueryAsync();

            MySqlDataReader reader = await cmd.ExecuteReaderAsync();
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    Animal animal = new Animal(Db);
                    animal.Id = cleanDataHelper.GetCleanInt(reader, 0);
                    animal.Name = cleanDataHelper.GetCleanString(reader, 1);
                    animal.Picture = cleanDataHelper.GetCleanString(reader, 2);
                    animal.Type = cleanDataHelper.GetCleanString(reader, 3);
                    animal.Breed = cleanDataHelper.GetCleanString(reader, 4);
                    animal.Gender = cleanDataHelper.GetCleanString(reader, 5);
                    animal.Availability = cleanDataHelper.GetCleanString(reader, 6);
                    animal.Age = cleanDataHelper.GetCleanInt(reader, 7);
                    animal.Weight = cleanDataHelper.GetCleanInt(reader, 8);
                    animal.Color = cleanDataHelper.GetCleanString(reader, 9);
                    animal.Description = cleanDataHelper.GetCleanString(reader, 10);
                    animal.News = cleanDataHelper.GetCleanString(reader, 11);
                    animal.DateCreated = reader.GetDateTime(12);

                    animalList.Add(animal);
                };
            }

            return animalList;
        }

        public async Task InsertAsync(string userID, int animalID)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"INSERT INTO `Users_Animals` (`userID`, `animalID`) VALUES (@userID, @animalID);";

            ApiHelper apiHelper = new ApiHelper();
            apiHelper.BindStringParam(cmd, Tuple.Create("@userID", userID));
            apiHelper.BindIntParam(cmd, Tuple.Create("@animalID", animalID));

            await cmd.ExecuteNonQueryAsync();
        }

        public async Task DeleteAsync(string userID, int animalID)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"DELETE FROM `Users_Animals` WHERE `userID` = @userID AND `animalID` = @animalID;";

            ApiHelper apiHelper = new ApiHelper();
            apiHelper.BindStringParam(cmd, Tuple.Create("@userID", userID));
            apiHelper.BindIntParam(cmd, Tuple.Create("@animalID", animalID));

            await cmd.ExecuteNonQueryAsync();
        }

        public async Task<bool> ExistsAsync(string userID, int animalID)
        {
            using MySqlCommand cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT COUNT(*) FROM `Users_Animals` WHERE `userID` = @userID AND `animalID` = @animalID;";

            ApiHelper apiHelper = new ApiHelper();
            apiHelper.BindStringParam(cmd, Tuple.Create("@userID", userID));
            apiHelper.BindIntParam(cmd, Tuple.Create("@animalID", animalID));

            return (long)await cmd.ExecuteScalarAsync() > 0;
        }
    }
}
