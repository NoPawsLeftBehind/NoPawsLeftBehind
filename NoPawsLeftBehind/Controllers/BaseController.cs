using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;

namespace NoPawsLeftBehind.Controllers
{
    public class BaseController : Controller
    {
        protected string GetUserId()
        {
            if (this.User.Identity.IsAuthenticated)
                return this.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
            else
                return null;
        }
    }
}
