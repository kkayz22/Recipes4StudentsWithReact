using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class Recipe
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty;
        [Required]
        public string ImageURL { get; set; } = string.Empty;
        [Required]
        public string RecipeURL { get; set; } = string.Empty;
        [Required]
        public int UserID { get; set; }
    }
}
