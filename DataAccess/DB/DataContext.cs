using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.DB
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<FreqReading> Readings { get; set; }
    }
}