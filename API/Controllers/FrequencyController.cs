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

        // DataContext represents the db session inside controller class
        public FrequencyController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FreqReading>>> GetReadings()
        {
            var readings = await _context.Readings.ToListAsync();

            return readings;
        }

        [HttpGet("current")]
        public async Task<ActionResult<FreqReading>> GetLatestReading()
        {
            var latestId = await _context.Readings.MaxAsync(x => x.Id);
            return await _context.Readings.FirstOrDefaultAsync(x => x.Id == latestId);
            
        }
    }
}