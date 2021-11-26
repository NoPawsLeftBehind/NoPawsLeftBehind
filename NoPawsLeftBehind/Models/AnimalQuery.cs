using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Threading.Tasks;
using MySqlConnector;
using System.Data.Common;
using NoPawsLeftBehind.Database;
using NoPawsLeftBehind.Helpers;
using NoPawsLeftBehind.Models;

namespace NoPawsLeftBehind.Models
{
    public class AnimalQuery
    {
        internal AppDb Db { get; }

        public AnimalQuery(AppDb db)
        {
            Db = db;
        }

        public async Task<List<Animal>> AllAnimalsAsync()
        {

            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT 	a.animalID, 
		                                a.name,
                                        IFNULL(a.picture, '') as picture,
		                                t.typeName, 
                                        b.breedName, 
                                        g.gender,
                                        av.availability,
                                        age,
                                        weight,
                                        c.color,
                                        description,
                                        news,
                                        dateCreated
                                FROM Animals a
                                LEFT JOIN AnimalTypes t ON a.typeID = t.typeID
                                LEFT JOIN Breeds b ON a.breedID = b.breedID
                                LEFT JOIN Genders g ON a.genderID = g.genderID
                                LEFT JOIN Availability av on a.availabilityID = av.availabilityID
                                LEFT JOIN Colors c on a.colorID = c.colorID
                                WHERE av.availability != 'Adopted'
                                ORDER BY dateCreated DESC;";

            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }

        public async Task<List<Animal>> SearchAnimalsAsync(FilterChoices choices)
        {
            using var cmd = Db.Connection.CreateCommand();

            //Build CommandText
            cmd.CommandText = @"SELECT 	a.animalID, 
		                                a.name,
                                        IFNULL(a.picture, '') as picture,
		                                t.typeName, 
                                        b.breedName, 
                                        g.gender,
                                        av.availability,
                                        age,
                                        weight,
                                        c.color,
                                        description,
                                        news,
                                        dateCreated
                                FROM Animals a
                                LEFT JOIN AnimalTypes t ON a.typeID = t.typeID
                                LEFT JOIN Breeds b ON a.breedID = b.breedID
                                LEFT JOIN Genders g ON a.genderID = g.genderID
                                LEFT JOIN Availability av on a.availabilityID = av.availabilityID
                                LEFT JOIN Colors c on a.colorID = c.colorID";

            if(choices.AnimalType != "")
            {
                cmd.CommandText = cmd.CommandText + Environment.NewLine + "WHERE t.typeName = @typeOption";

                if(choices.Breed != "")
                {
                    cmd.CommandText = cmd.CommandText + Environment.NewLine + "AND b.breedName = @breedOption";
                }

                if(choices.Disposition != "")
                {
                    cmd.CommandText = cmd.CommandText + Environment.NewLine + @"AND @dispoOption IN (SELECT d.disposition 
                                                                                FROM Animals_Dispositions ad
                                                                                LEFT JOIN Dispositions d on d.dispositionID = ad.dispositionID
                                                                                WHERE ad.animalID = a.animalID)";
                }

            }
            else if (choices.Breed != "")
            {
                cmd.CommandText = cmd.CommandText + Environment.NewLine + "WHERE b.breedName = @breedOption";

                if (choices.Disposition != "")
                {
                    cmd.CommandText = cmd.CommandText + Environment.NewLine + @"AND @dispoOption IN (SELECT d.disposition 
                                                                                FROM Animals_Dispositions ad
                                                                                LEFT JOIN Dispositions d on d.dispositionID = ad.dispositionID
                                                                                WHERE ad.animalID = a.animalID)";
                }
            }
            else if (choices.Disposition != "")
            {
                cmd.CommandText = cmd.CommandText + Environment.NewLine + @"WHERE @dispoOption IN (SELECT d.disposition 
                                                                            FROM Animals_Dispositions ad
                                                                            LEFT JOIN Dispositions d on d.dispositionID = ad.dispositionID
                                                                            WHERE ad.animalID = a.animalID)";
            }

            cmd.CommandText = cmd.CommandText + Environment.NewLine + @"AND av.availability != 'Adopted'
                                                                        ORDER BY dateCreated DESC;";

            //Bind parameters
            ApiHelper apiHelper = new ApiHelper();
            apiHelper.BindStringParam(cmd, Tuple.Create("@typeOption", choices.AnimalType));
            apiHelper.BindStringParam(cmd, Tuple.Create("@breedOption", choices.Breed));
            apiHelper.BindStringParam(cmd, Tuple.Create("@dispoOption", choices.Disposition));

            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }

        public async Task<List<Animal>> ReadAllAsync(DbDataReader reader)
        {
            var animals = new List<Animal>();

            using(reader)
            {
                while (await reader.ReadAsync())
                {
                    var animal = new Animal(Db)
                    {
                        Id = reader.GetInt32(0),
                        Name = reader.GetString(1),
                        Picture = reader.GetString(2),
                        Type = reader.GetString(3),
                        Breed = reader.GetString(4),
                        Gender = reader.GetString(5),
                        Availability = reader.GetString(6),
                        Age = reader.GetInt32(7),
                        Weight = reader.GetInt32(8),
                        Color = reader.GetString(9),
                        Description = reader.GetString(10),
                        News = reader.GetString(11),
                        DateCreated = reader.GetDateTime(12)
                    };
                    animals.Add(animal);
                }
            }

            return animals;
        }

        public async Task<Animal> OneAnimalAsync(int id)
        {

            using var cmd = Db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT 	a.animalID, 
		                                a.name,
                                        IFNULL(a.picture, '') as picture,
		                                t.typeName, 
                                        b.breedName, 
                                        g.gender,
                                        av.availability,
                                        age,
                                        weight,
                                        c.color,
                                        description,
                                        news,
                                        dateCreated
                                FROM Animals a
                                LEFT JOIN AnimalTypes t ON a.typeID = t.typeID
                                LEFT JOIN Breeds b ON a.breedID = b.breedID
                                LEFT JOIN Genders g ON a.genderID = g.genderID
                                LEFT JOIN Availability av on a.availabilityID = av.availabilityID
                                LEFT JOIN Colors c on a.colorID = c.colorID
                                WHERE a.animalID = @id;";

            ApiHelper apiHelper = new ApiHelper();
            apiHelper.BindIntParam(cmd, Tuple.Create("@id", id));

            return await ReadOneAsync(await cmd.ExecuteReaderAsync());
        }

        public async Task<Animal> ReadOneAsync(DbDataReader reader)
        {
            List<Animal> animals = new List<Animal>();

            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var animal = new Animal(Db)
                    {
                        Id = reader.GetInt32(0),
                        Name = reader.GetString(1),
                        Picture = reader.GetString(2),
                        Type = reader.GetString(3),
                        Breed = reader.GetString(4),
                        Gender = reader.GetString(5),
                        Availability = reader.GetString(6),
                        Age = reader.GetInt32(7),
                        Weight = reader.GetInt32(8),
                        Color = reader.GetString(9),
                        Description = reader.GetString(10),
                        News = reader.GetString(11),
                        DateCreated = reader.GetDateTime(12)
                    };
                    animals.Add(animal);
                }
            }

            if (animals.Count == 0)
                return null;

            return animals[0];
        }
    }
}
