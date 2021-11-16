using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;

namespace NoPawsLeftBehind.Controllers
{
    public class BaseController : Controller
    {
        protected string GetUserId()
        {
            return this.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
        }
    }
}
