using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace API.Controllers
{
    //le terme controller sera remplacer par le premier mot, en l' occurence : (users) de UsersController
    [Route("api/[controller]")] // /api/users
    [ApiController]
    public class UsersController(DataContext  context) : ControllerBase
    {

        [HttpGet]
        public async Task <ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            var users = await context.Users.ToListAsync();

            if(users == null) return NotFound();
            return users;
        }

        [HttpGet("{id:int}")] // /api/users/1
        public async Task <ActionResult<AppUser>> GetUser(int id)
        {
            var user = await context.Users.FindAsync(id);

            if (user == null) return NotFound();
            return user;
        }
    }

}
