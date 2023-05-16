﻿using Microsoft.EntityFrameworkCore;
using webapi.Data;
using webapi.Models;

namespace webapi.Services.RecipesService
{
    public class RecipesService : IRecipesService
    {
        private static List<Recipe> recipesList = new List<Recipe>
        {
            new Recipe
            {
                Id = 1,
                Title = "Pieczony Ryz",
                Description = "Fajny przepis",
                ImageURL = "XD",
                RecipeURL = "XD",
                UserID = 1
            },
            new Recipe
            {
                Id = 2,
                Title = "Pieczony Makaron",
                Description = "Fajny przepis v2",
                ImageURL = "XD",
                RecipeURL = "XD",
                UserID = 2
            },
        };
        private readonly DataContext _context;

        public RecipesService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Recipe>> AddRecipe(Recipe recipe)
        {
            _context.Recipes.Add(recipe);
            await _context.SaveChangesAsync();
            return await _context.Recipes.ToListAsync();
        }

        public async Task<List<Recipe>?> DeleteRecipe(int id)
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