using Microsoft.EntityFrameworkCore;
using webapi.Data;
using webapi.Models;

namespace webapi.Services.RecipesService
{
    public class RecipesService : IRecipesService
    {
        private readonly DataContext _context;

        public RecipesService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Recipe>> AddRecipe(Recipe recipe)
        {
            recipe.Id = Guid.NewGuid();
            _context.Recipes.Add(recipe);
            await _context.SaveChangesAsync();
            return await _context.Recipes.ToListAsync();
        }

        public async Task<List<Recipe>?> DeleteRecipe(Guid id)
        {
            var recipe = await _context.Recipes.FindAsync(id);
            if (recipe == null)
            {
                return null;
            }
            _context.Recipes.Remove(recipe);
            await _context.SaveChangesAsync();

            return await _context.Recipes.ToListAsync();
        }

        public async Task<Recipe?> GetRecipe(int id)
        {
            var recipe = await _context.Recipes.FindAsync(id);
            if (recipe == null)
            {
                return null;
            }
            return recipe;
        }

        public async Task<List<Recipe>> GetRecipes()
        {
            var recipes = await _context.Recipes.ToListAsync();
            return recipes;
        }
    }
}
