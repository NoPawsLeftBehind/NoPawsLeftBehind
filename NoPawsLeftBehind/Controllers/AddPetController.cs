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
    public class AddPetController : ControllerBase
    {
        public AddPetController(AppDb db)
        {
            Db = db;
        }

        public AppDb Db { get; }

        [HttpGet]
        public async Task<IActionResult> GetAddAnimalOptions()
        {
            await Db.Connection.OpenAsync();
            AnimalTypeQuery typeQuery = new AnimalTypeQuery(Db);
            List<AnimalType> typeResult = await typeQuery.AllTypesAsync();

            BreedQuery breedQuery = new BreedQuery(Db);
            List<Breed> breedResult = await breedQuery.AllBreedsAsync();

            SexQuery sexQuery = new SexQuery(Db);
            List<Sex> sexResult = await sexQuery.AllSexesAsync();

            AvailabilityQuery availQuery = new AvailabilityQuery(Db);
            List<Availability> availResult = await availQuery.AllAvailabilitiesAsync();

            ColorQuery colorQuery = new ColorQuery(Db);
            List<Color> colorResult = await colorQuery.AllColorsAsync();

            DispositionQuery dispoQuery = new DispositionQuery(Db);
            List<Disposition> dispoResult = await dispoQuery.AllDispositionsAsync();

            AddPetOptions formOptions = new AddPetOptions();

            formOptions.AnimalTypes = typeResult;
            formOptions.Breeds = breedResult;
            formOptions.Sexes = sexResult;
            formOptions.Availabilities = availResult;
            formOptions.Colors = colorResult;
            formOptions.Dispositions = dispoResult;

            return new OkObjectResult(formOptions);
        }
    }
}
