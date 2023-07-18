using DataAccess.Repository;
using Logic.Services;
using Logic.Services.Abstractions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Logic
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
            IConfiguration config)
        {
            services.AddScoped<IFreqReadingService, FreqReadingService>();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            DataAccess.ServiceCollectionExtension.AddApplicationServices(services, config);
            return services;
        }
    }
}
