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
    }
}