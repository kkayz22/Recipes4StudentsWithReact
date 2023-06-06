using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Services.RecipesService;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class RecipesController : ControllerBase
    {
        private readonly IRecipesService _recipesService;
        public RecipesController(IRecipesService recipesService)
        {
            _recipesService = recipesService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Recipe>>> GetRecipes()
        {
            return await _recipesService.GetRecipes();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Recipe>> GetRecipe(int id)
        {
            var result = await _recipesService.GetRecipe(id);
            if (result == null)
            {
                return NotFound("Recipe does not exist.");
            }
            return Ok(result);
        }

        [HttpPost, Authorize]
        public async Task<ActionResult<List<Recipe>>> AddRecipe([FromBody]Recipe recipe)
        {
            var result = await _recipesService.AddRecipe(recipe);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Recipe>>> DeleteRecipe(Guid id)
        {
            var result = await _recipesService.DeleteRecipe(id);
            if (result == null) return NotFound("Recipe does not exist.");
            return Ok(result);
        }
    }
}
