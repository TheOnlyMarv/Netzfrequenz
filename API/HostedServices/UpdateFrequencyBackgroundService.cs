using API.Controllers;
using API.Data;

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
                var periodicTimer = new PeriodicTimer(TimeSpan.FromSeconds(5));
                while (await periodicTimer.WaitForNextTickAsync(stoppingToken))
                {
                    using (var scope = ServiceScopeFactory.CreateScope())
                    {
                        var dataContext = scope.ServiceProvider.GetRequiredService<DataContext>();
                        try
                        {
                            await new FrequencyController().UpdateDb(dataContext);
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
