using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using webapi.DTO;
using webapi.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Reflection.Metadata.Ecma335;
using webapi.Data;

namespace webapi.Controllers
{
    public class AuthController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration, DataContext context) 
        {
            _configuration = configuration;
            _context = context;
        } 

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register([FromBody]UserDTO request)
        {
            var user = await _context.Users.FindAsync(request.Email);
            if (user == null)
            {
                string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

                User newUser = new();
                newUser.Id = Guid.NewGuid();
                newUser.Email = request.Email;
                newUser.PasswordHash = passwordHash;
                newUser.Username = request.Username;
                newUser.Index = request.Index;
                newUser.Field = request.Field;

                _context.Users.Add(newUser);
                await _context.SaveChangesAsync();

                return Ok(newUser);
            } 
            else
            {
                return BadRequest("User already exist.");
            }
        }

        //[HttpPost("login")]
        //public ActionResult<User> Login([FromBody]UserDTO request)
        //{
        //    if (user.Email != request.Email)
        //    {
        //        return BadRequest("User not found.");
        //    }

        //    if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash)) 
        //    {
        //        return BadRequest("Wrong password.");
        //    }

        //    string token = CreateToken(user);

        //    return Ok(token);
        //}

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes
                (_configuration.GetSection("AppSettings:Token").Value!));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(3),
                signingCredentials: credentials
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}
