using API.Data;
using System.Text.Json;
using API.HostedServices;
using Microsoft.EntityFrameworkCore;
using Logic;
using API.Configurations;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddHostedService<UpdateFrequencyBackgroundService>();
builder.Services.AddControllers().AddJsonOptions(opts => {
    opts.JsonSerializerOptions.PropertyNamingPolicy = null;
    opts.JsonSerializerOptions.Converters.Add(new DateTimeOffsetConverter());
    }
    );
builder.Services.AddCors();
builder.Services.AddApplicationServices(builder.Configuration);
var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200"));
app.MapControllers();

app.Run();
