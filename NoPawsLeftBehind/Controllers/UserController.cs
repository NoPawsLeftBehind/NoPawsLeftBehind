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
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        public UserController (AppDb db)
        {
            Db = db;
        }

        public AppDb Db { get; }

        // TODO: REMOVE AFTER TESTING COMPLETE
        [HttpGet]
        public async Task<IEnumerable<User>> ReadAllAsync()
        {
            await Db.Connection.OpenAsync();

            UserQuery userQuery = new UserQuery(Db);
            try
            {
                return await userQuery.ReadAllAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }

        // api/Users/signup
        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody]User user)
        {
            await Db.Connection.OpenAsync();

            UserQuery userQuery = new UserQuery(Db);
            try
            {
                await userQuery.InsertAsync(user);

                return new OkObjectResult(user);
            }
            catch(Exception ex)
            {
                return new ObjectResult(ex);
            }
        }

        // api/Users/login
        [HttpPost("login")]
        public async Task<User> Login([FromBody]Login login)
        {
            await Db.Connection.OpenAsync();

            UserQuery userQuery = new UserQuery(Db);
            try
            {
                return await userQuery.ReadOneAsync(login.Email, login.Password);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }
    }
}
