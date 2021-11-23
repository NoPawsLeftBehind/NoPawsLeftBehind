using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using NoPawsLeftBehind.Database;
using NoPawsLeftBehind.Models;
using NoPawsLeftBehind.Queries;

namespace NoPawsLeftBehind.Controllers
{
    [ApiController]
    [Route("api/AddAnimal")]
    public class AddAnimalController : ControllerBase
    {
        public AddAnimalController(AppDb db)
        {
            Db = db;
        }

        public AppDb Db { get; }

        [HttpGet]
        public async Task<IActionResult> GetFilterOptions()
        {
            await Db.Connection.OpenAsync();
            AnimalTypeQuery typeQuery = new AnimalTypeQuery(Db);
            List<AnimalType> typeResult = await typeQuery.AllTypesAsync();

            BreedQuery breedQuery = new BreedQuery(Db);
            List<Breed> breedResult = await breedQuery.AllBreedsAsync();

            DispositionQuery dispoQuery = new DispositionQuery(Db);
            List<Disposition> dispoResult = await dispoQuery.AllDispositionsAsync();

            FilterOptions filterOptions = new FilterOptions();

            filterOptions.AnimalTypes = typeResult;
            filterOptions.Breeds = breedResult;
            filterOptions.Dispositions = dispoResult;

            return new OkObjectResult(filterOptions);
        }

        [HttpPost]
        public async Task<IActionResult> PostFilterResults([FromBody] FilterChoices choices)
        {
            await Db.Connection.OpenAsync();

            AnimalQuery animalQuery = new AnimalQuery(Db);
            var result = await animalQuery.SearchAnimalsAsync(choices);

            return new OkObjectResult(result);
        }
    }
}
