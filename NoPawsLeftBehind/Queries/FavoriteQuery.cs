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
                                        LEFT JOIN Users_Animals ua on a.animalID = ua.animalID 
                                        AND ua.userID = @userID;";

            ApiHelper apiHelper = new ApiHelper();
            apiHelper.BindStringParam(cmd, Tuple.Create("@userID", sUserId));

            await cmd.ExecuteNonQueryAsync();

            MySqlDataReader reader = await cmd.ExecuteReaderAsync();
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    Animal animal = new Animal(Db);
                    animal.Id = reader.GetInt32(0);
                    animal.Name = reader.GetString(1);
                    animal.Picture = reader.GetString(2);
                    animal.Type = reader.GetString(3);
                    animal.Breed = reader.GetString(4);
                    animal.Gender = reader.GetString(5);
                    animal.Availability = reader.GetString(6);
                    animal.Age = reader.GetInt32(7);
                    animal.Weight = reader.GetInt32(8);
                    animal.Color = reader.GetString(9);
                    animal.Description = reader.GetString(10);
                    animal.News = reader.GetString(11);
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
    }
}
