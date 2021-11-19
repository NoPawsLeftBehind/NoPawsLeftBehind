using Microsoft.AspNetCore.Authorization;
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
    public class AdoptionController : BaseController
    {
        public AdoptionController(AppDb db)
        {
            Db = db;
        }

        public AppDb Db { get; }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> ReadAllPendingAdoptionAsync()
        {
            await Db.Connection.OpenAsync();

            AdoptionQuery adoptionQuery = new AdoptionQuery(Db);
            UserQuery userQuery = new UserQuery(Db);

            try
            {
                string userId = GetUserId();
                bool bUserExists = await userQuery.ExistsAsync(userId);

                if (!bUserExists)
                {
                    User user = new User();
                    user.userID = userId;

                    try
                    {
                        await userQuery.InsertAsync(user);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex);
                        return new ObjectResult(ex);
                    }

                }

                IEnumerable<Animal> result = await adoptionQuery.ReadPendingPetsAsync();
                return new OkObjectResult(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return new ObjectResult(ex);
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> UpdateAdoptionStatus([FromBody] AdoptionStatus adoptionStatus)
        {
            await Db.Connection.OpenAsync();

            Console.WriteLine(adoptionStatus.AnimalId);
            Console.WriteLine(adoptionStatus.Status);

            // TODO
            
            return new ObjectResult("Method not implemented!");
        }
    }
}
