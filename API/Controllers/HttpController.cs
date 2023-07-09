using System.Net;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace API.Controllers
{
    public class HttpController
    {
        
        public async Task<float> UpdateDb(DataContext context)
        {
            // Make request to get latest frequency value.
            HttpClient http = new HttpClient();
            try {
                HttpResponseMessage response = await http.GetAsync("https://www.netzfrequenz.info/json/act.json");
                response.EnsureSuccessStatusCode();

                // Store result in db.
                float newFreqValue = float.Parse(response.Content.ReadAsStringAsync().Result);
                FreqReading newReading = new FreqReading{ Timestamp = DateTime.Now, Frequency = newFreqValue};
                context.Add(newReading);
                context.SaveChanges();
                return newFreqValue;
            }
            catch(HttpRequestException e) {
                Console.WriteLine(e.Message);
                throw;
            }
        }

        public async Task<ActionResult<IEnumerable<FreqReading>>> GetReadings(DataContext context)
        {
            var readings = context.Readings
                .OrderByDescending(x => x.Timestamp)
                .Take(10)
                .ToList();
            return readings;
        }

        public async Task<ActionResult<FreqReading>> GetLatestReading(DataContext context)
        {
            var latestId = await context.Readings.MaxAsync(x => x.Id);
            return await context.Readings.FirstOrDefaultAsync(x => x.Id == latestId);
        }

    }
}