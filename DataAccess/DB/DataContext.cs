using DataAccess.Configurations;
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


        protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
        {
            base.ConfigureConventions(configurationBuilder);

            // Use utc for all DateTimeOffset
            configurationBuilder.Properties<DateTimeOffset>()
                                .HaveConversion<DateTimeOffsetUtcConverter>()
                                .HaveColumnType("TEXT");
        }
    }
}