using System.Diagnostics.Contracts;
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
        HttpController controller = new HttpController();

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
            return await controller.GetReadings(_context);
        }

        /// <summary>
        /// This request gets the latest frequency reading from the database.
        /// </summary>
        [HttpGet("latest")]
        public async Task<ActionResult<FreqReading>> GetLatestReading()
        {
            return await controller.GetLatestReading(_context);
        }

        /// <summary>
        /// This request gets the current frequency value from netzfrequenz.info and stores it in the database.
        /// </summary>
        [HttpGet("update")]
        public float Update()
        {
            return controller.UpdateDb(_context);
        }
    }
}
