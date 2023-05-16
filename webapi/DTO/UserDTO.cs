namespace webapi.DTO
{
    public class UserDTO
    {
        public Guid Id { get; set; }
        public required string Username { get; set; }
        public required string Password { get; set; }  
    }
}
