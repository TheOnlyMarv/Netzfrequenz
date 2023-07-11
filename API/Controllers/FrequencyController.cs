using System.Net;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace API.Controllers
{
    public class FrequencyController
    {
        
        public async Task<float> UpdateDb(DataContext context)
        {
            // Make request to get latest frequency value.
            try {
                HttpResponseMessage response = await CallUrl("https://www.netzfrequenz.info/json/act.json");
                response.EnsureSuccessStatusCode();

                // Parse and store result in db.
                float newFreqValue = float.Parse(response.Content.ReadAsStringAsync().Result);
                FreqReading newReading = new FreqReading{ Timestamp = DateTime.Now, Frequency = newFreqValue};
                context.Add(newReading);
                context.SaveChanges();
                return newFreqValue;
            }
            // Catch exception if request is unsuccessful.
            catch(HttpRequestException e) {
                Console.WriteLine(e.Message);
                throw;
            }
        }

        public async Task<ActionResult<IEnumerable<FreqReading>>> GetReadings(DataContext context, int limit)
        {
            var readings = await context.Readings
                .OrderByDescending(x => x.Timestamp)
                .Take(limit)
                .ToListAsync();
            return readings;
        }

        public async Task<ActionResult<FreqReading>> GetLatestReading(DataContext context)
        {
            var latestId = await context.Readings.MaxAsync(x => x.Id);
            return await context.Readings.FirstOrDefaultAsync(x => x.Id == latestId);
        }

        private static async Task<HttpResponseMessage> CallUrl(string fullUrl)
        {
            HttpClient client = new HttpClient();
            var response = await client.GetAsync(fullUrl);
            return response;
        }
    }
}