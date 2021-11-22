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
    public class AdoptionQuery
    {
        public AdoptionQuery(AppDb db)
        {
            Db = db;
        }

        public AppDb Db { get; }

        public async Task<IEnumerable<Animal>> ReadPendingPetsAsync()
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
                                        LEFT JOIN Colors c on a.colorID = c.colorID
                                        INNER JOIN Availability av on a.availabilityID = av.availabilityID
                                        WHERE av.availabilityID = 3;";

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
                    animal.DateCreated = cleanDataHelper.GetCleanDateTime(reader, 12);

                    animalList.Add(animal);
                };
            }

            return animalList;
        }
    }
}
