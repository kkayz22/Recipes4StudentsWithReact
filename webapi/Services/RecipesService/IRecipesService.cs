using webapi.Models;

namespace webapi.Services.RecipesService
{
    public interface IRecipesService
    {
        Task<List<Recipe>> GetRecipes();
        Task<Recipe?> GetRecipe(int id);
        Task<List<Recipe>> AddRecipe(Recipe recipe);
        Task<List<Recipe>?> DeleteRecipe(Guid id);
    }
}
