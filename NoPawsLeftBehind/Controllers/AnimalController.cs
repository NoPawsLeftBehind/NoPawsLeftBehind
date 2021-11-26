using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using NoPawsLeftBehind.Database;
using NoPawsLeftBehind.Models;
using NoPawsLeftBehind.Queries;

namespace NoPawsLeftBehind.Controllers
{
    [ApiController]
    [Route("api/Animals")]
    public class AnimalController : BaseController
    {
        public AnimalController(AppDb db)
        {
            Db = db;
        }

        public AppDb Db { get; }

        [HttpGet]
        public async Task<IActionResult> GetAnimals()
        {
            await Db.Connection.OpenAsync();
            var query = new AnimalQuery(Db);
            var result = await query.AllAnimalsAsync();
            return new OkObjectResult(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAnimal(int id)
        {
            await Db.Connection.OpenAsync();
            AnimalQuery animalQuery = new AnimalQuery(Db);
            Animal animalResult = await animalQuery.OneAnimalAsync(id);

            DispositionQuery dispoQuery = new DispositionQuery(Db);
            List<Disposition> dispoResult = await dispoQuery.AnimalDispositionsAsync(id);

            animalResult.Dispositions = dispoResult;

            return new OkObjectResult(animalResult);
        }

        [HttpPost]
        //[Authorize]
        public async Task<IActionResult> CreateAnimal([FromBody]CreateAnimal animal)
        {
            await Db.Connection.OpenAsync();
            Console.WriteLine(animal);

            AnimalQuery addQuery = new AnimalQuery(Db);

            await addQuery.addAnimal(animal.Type, animal.Breed, animal.Gender, animal.Name,
                                    animal.Picture, animal.Availability, animal.Age, animal.Weight,
                                    animal.Colors[0], animal.Description, animal.News);

            return new OkObjectResult(animal);
        }
    }
}