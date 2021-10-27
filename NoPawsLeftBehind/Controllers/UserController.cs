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
    }
}
