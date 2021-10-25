using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using NoPawsLeftBehind.Models;

namespace NoPawsLeftBehind.Controllers
{
    [ApiController]
    [Route("api/Animals")]
    public class AnimalController : ControllerBase
    {
        public MySqlConnection Db { get; }

        public AnimalController(MySqlConnection db)
        {
            Db = db;
        }

        [HttpGet]
        public async Task<IActionResult> GetAnimals()
        {
            await Db.OpenAsync();
            var query = new AnimalQuery(Db);
            var result = await query.AllAnimalsAsync();
            return new OkObjectResult(result);
        }
    }
}
