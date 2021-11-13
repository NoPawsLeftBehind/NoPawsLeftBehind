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
    [Route("api/FilterOptions")]
    public class FilterOptionsController : ControllerBase
    {
        public FilterOptionsController(AppDb db)
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

        //TODO: Add HTTPPOST request with FROMBODY for filter results
    }
}
