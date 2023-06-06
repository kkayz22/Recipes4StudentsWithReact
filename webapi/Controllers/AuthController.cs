using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using webapi.DTO;
using webapi.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using System.Text;
using webapi.Data;
using Microsoft.EntityFrameworkCore;

namespace webapi.Controllers
{
    [Route("[controller]")]
    [ApiController]
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
        public async Task<ActionResult<User>> Register([FromBody]UserRegisterDTO request)
        {
            var user = _context.Users.Any(u => u.Email == request.Email);
            if (user)
            {
                return BadRequest("User already exist.");
            }
            if (_context.Users.Any(u => u.Username == request.Username)) {
                return BadRequest("Username already taken.");
            } 
            else
            {
                string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

                User newUser = new User();
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
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login([FromBody] UserLoginDTO request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
            {
                return BadRequest("User does not exist.");
            } 
            else
            {
                if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                {
                    return BadRequest("Wrong password.");
                }

                string token = CreateToken(user);

                var response = new 
                {
                    User = user,
                    Token = token
                };

                return Ok(response);
            }
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim> {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Upn, user.Username),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}

