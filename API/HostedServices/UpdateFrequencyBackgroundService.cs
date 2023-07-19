using API.Controllers;
using API.Data;
using DataAccess.Repository;
using Logic.Services.Abstractions;

namespace API.HostedServices
{
    public class UpdateFrequencyBackgroundService : BackgroundService
    {
        private IServiceScopeFactory ServiceScopeFactory { get; }
        private ILogger Logger { get; }


        public UpdateFrequencyBackgroundService(IServiceScopeFactory serviceScopeFactory, ILogger<UpdateFrequencyBackgroundService> logger)
        {
            ServiceScopeFactory = serviceScopeFactory;
            Logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            try
            {
                var periodicTimer = new PeriodicTimer(TimeSpan.FromSeconds(1));
                while (await periodicTimer.WaitForNextTickAsync(stoppingToken))
                {
                    using (var scope = ServiceScopeFactory.CreateScope())
                    {
                        var service = scope.ServiceProvider.GetRequiredService<IFreqReadingService>();
                        try
                        {
                            await service.Update();
                        }
                        catch (Exception ex)
                        {
                            Logger.LogWarning($"Something went wrong: {ex}");
                        }
                    }
                }
            }
            catch (OperationCanceledException)
            {
                Logger.LogInformation($"Operation was canceled");
            }
        }
    }
}
