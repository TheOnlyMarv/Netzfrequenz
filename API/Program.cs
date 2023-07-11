using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<DataContext>(opt => 
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();
var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200"));
app.MapControllers();

// TO DO: Where does this go?
async Task UpdateFrequencyReadings(TimeSpan timeSpan)
{
    var periodicTimer = new PeriodicTimer(timeSpan);
    while (await periodicTimer.WaitForNextTickAsync())
    {
        HttpClient http = new HttpClient();
        var currentFreq = http.GetAsync("https://localhost:5001/api/frequency/update").Result.Content.ReadAsStringAsync().Result;
        System.Console.WriteLine(currentFreq);
    }
}

UpdateFrequencyReadings(TimeSpan.FromSeconds(5));

app.Run();
