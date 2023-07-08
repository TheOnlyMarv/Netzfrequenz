using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<DataContext>(opt => 
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
var app = builder.Build();

// Configure the HTTP request pipeline.
app.MapControllers();

// TO DO: Where does this go?
async Task RunInBackground(TimeSpan timeSpan)
{
    var periodicTimer = new PeriodicTimer(timeSpan);
    while (await periodicTimer.WaitForNextTickAsync())
    {
        HttpClient http = new HttpClient();
        var latestFreq = http.GetAsync("https://localhost:5001/api/frequency/update").Result.Content.ReadAsStringAsync().Result;
        System.Console.WriteLine(latestFreq);
    }
}

RunInBackground(TimeSpan.FromSeconds(5));

app.Run();
