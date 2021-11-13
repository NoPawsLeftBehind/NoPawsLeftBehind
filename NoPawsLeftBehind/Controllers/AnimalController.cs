using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using NoPawsLeftBehind.Database;
using NoPawsLeftBehind.Models;

namespace NoPawsLeftBehind.Controllers
{
    [ApiController]
    [Route("api/Animals")]
    public class AnimalController : ControllerBase
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

        //TODO: Add in gathering LIST of Dispositions
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAnimal(int id)
        {
            await Db.Connection.OpenAsync();
            var query = new AnimalQuery(Db);
            var result = await query.OneAnimalAsync(id);
            return new OkObjectResult(result);
        }
    }
}