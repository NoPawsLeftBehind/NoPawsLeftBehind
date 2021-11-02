using Microsoft.AspNetCore.Mvc;
using NoPawsLeftBehind.Database;
using NoPawsLeftBehind.Models;
using NoPawsLeftBehind.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoPawsLeftBehind.Controllers
{
    [ApiController]
    [Route("api/Test")]
    public class TestController : ControllerBase
    {
        public TestController(AppDb db)
        {
            Db = db;
        }

        public AppDb Db { get; }

        [HttpGet]
        public async Task<Test> GetTest()
        {
            await Db.Connection.OpenAsync();
            AnimalQuery animalQuery = new AnimalQuery(Db);
            List<Animal> animalResult = await animalQuery.AllAnimalsAsync();

            UserQuery userQuery = new UserQuery(Db);
            List<User> userResult = await userQuery.ReadAllAsync();

            Test test = new Test();
            test.Animals = animalResult;
            test.Users = userResult;

            return test;
        }
    }
}
