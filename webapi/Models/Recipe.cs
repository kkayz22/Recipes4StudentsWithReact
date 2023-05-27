using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class Recipe
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty;
        [Required]
        public string ImageURL { get; set; } = string.Empty;
        [Required]
        public string RecipeURL { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public int Index { get; set; }
    }
}
