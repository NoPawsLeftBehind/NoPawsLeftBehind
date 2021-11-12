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
    public class FavoriteController : ControllerBase
    {
        public FavoriteController(AppDb db)
        {
            Db = db;
        }

        public AppDb Db { get; }

        [HttpGet]
        public async Task<IActionResult> ReadAllFavoritesAsync([FromQuery]string userId)
        {
            await Db.Connection.OpenAsync();


            FavoriteQuery favoriteQuery = new FavoriteQuery(Db);
            try
            {
                IEnumerable<Animal> result = await favoriteQuery.ReadFavoritesAsync(userId);
                return new OkObjectResult(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return new ObjectResult(ex);
            }

        }
    }
}
