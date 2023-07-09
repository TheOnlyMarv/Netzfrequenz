using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class HttpController
    {
        
        // private readonly DataContext _context;

        // public HttpController(DataContext context)
        // {
        //     _context = context;
        // }

        public float UpdateDb(DataContext context)
        {
            // Make request to get latest frequency value.
            HttpClient http = new HttpClient();
            var newFreqValue = float.Parse(http.GetAsync("https://www.netzfrequenz.info/json/act.json").Result.Content.ReadAsStringAsync().Result);

            // Store result in db.
            FreqReading newReading = new FreqReading{ Timestamp = DateTime.Now, Frequency = newFreqValue};
            context.Add(newReading);
            context.SaveChanges();
            return newFreqValue;
        }

        public async Task<ActionResult<IEnumerable<FreqReading>>> GetReadings(DataContext context)
        {
            return await context.Readings.ToListAsync();
        }

        public async Task<ActionResult<FreqReading>> GetLatestReading(DataContext context)
        {
            var latestId = await context.Readings.MaxAsync(x => x.Id);
            return await context.Readings.FirstOrDefaultAsync(x => x.Id == latestId);
        }

    }
}