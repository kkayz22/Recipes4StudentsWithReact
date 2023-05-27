using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Username { get; set; } = string.Empty;
        [Required]
        public string PasswordHash { get; set; } = string.Empty;
        [Required]
        public int Index {get; set; }
        [Required]
        public string Field { get; set; } = string.Empty;
    }
}
