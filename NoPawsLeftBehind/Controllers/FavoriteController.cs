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
    public class FavoriteController : BaseController
    {
        public FavoriteController(AppDb db)
        {
            Db = db;
        }

        public AppDb Db { get; }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> ReadAllFavoritesAsync()
        {
            await Db.Connection.OpenAsync();

            FavoriteQuery favoriteQuery = new FavoriteQuery(Db);

            try
            {
                string userId = GetUserId();
                IEnumerable<Animal> result = await favoriteQuery.ReadFavoritesAsync(userId);
                return new OkObjectResult(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return new ObjectResult(ex);
            }
        }

        [HttpPost]
        public async Task<IActionResult> InsertFavorite([FromBody] int animalId)
        {
            await Db.Connection.OpenAsync();

            FavoriteQuery favoriteQuery = new FavoriteQuery(Db);
            try
            {
                string userId = GetUserId();
                await favoriteQuery.InsertAsync(userId, animalId);

                return new OkObjectResult("Favorite added.");
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex);
            }
        }
    }
}
