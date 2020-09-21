using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Persistence {
    public class DataContext : DbContext, IPersistenceContext {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        // Example:
        public DbSet<User> User { get; set; }
    }
}