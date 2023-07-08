using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FrequencyController : ControllerBase
    {
        private readonly DataContext _context;

        public FrequencyController(DataContext context)
        {
            _context = context;
        }

        /// <summary>
        /// This request gets all frequency readings from the database.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FreqReading>>> GetReadings()
        {
            var readings = await _context.Readings.ToListAsync();

            return readings;
        }

        /// <summary>
        /// This request gets the latest frequency reading from the database.
        /// </summary>
        [HttpGet("latest")]
        public async Task<ActionResult<FreqReading>> GetLatestReading()
        {
            var latestId = await _context.Readings.MaxAsync(x => x.Id);
            return await _context.Readings.FirstOrDefaultAsync(x => x.Id == latestId);
            
        }

        /// <summary>
        /// This request gets the current frequency value from netzfrequenz.info and stores it in the database.
        /// </summary>
        [HttpGet("update")]
        public float Update()
        {
            // Make request to get latest frequency value.
            HttpClient http = new HttpClient();
            var newFreqValue = float.Parse(http.GetAsync("https://www.netzfrequenz.info/json/act.json").Result.Content.ReadAsStringAsync().Result);

            // Store result in db.
            FreqReading newReading = new FreqReading{ Timestamp = DateTime.Now, Frequency = newFreqValue};
            _context.Add(newReading);
            _context.SaveChanges();
            return newFreqValue;
        }
    }
}
