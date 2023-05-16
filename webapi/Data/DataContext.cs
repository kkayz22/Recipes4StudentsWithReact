using Microsoft.EntityFrameworkCore;
using webapi.Models;

namespace webapi.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseNpgsql("Host=localhost; Database=Recipes4Students; Username=postgres; Password=123");
        }

        public DbSet<Recipe> Recipes { get; set; }
    }
}
