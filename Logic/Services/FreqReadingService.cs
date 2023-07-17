using AutoMapper;
using Contract.DTOs;
using DataAccess.Entities;
using DataAccess.Repository;
using Logic.Services.Abstractions;

namespace Logic.Services
{
    internal class FreqReadingService : IFreqReadingService
    {

        private readonly IFreqReadingRepository _repository;
        private readonly IMapper _mapper;

        public FreqReadingService(IFreqReadingRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<FreqReadingDto> Update()
        {
            // Make request to get latest frequency value.
            try {
                HttpResponseMessage response = await CallUrl("https://www.netzfrequenz.info/json/act.json");
                response.EnsureSuccessStatusCode();
                float newFreqValue = float.Parse(response.Content.ReadAsStringAsync().Result);
                FreqReading newReading = new FreqReading{ Timestamp = DateTime.Now, Frequency = newFreqValue};
                await _repository.AddAndSave(new []{newReading});
                return _mapper.Map<FreqReadingDto>(newReading);
            }
            // Catch exception if request is unsuccessful.
            catch(HttpRequestException e) {
                Console.WriteLine(e.Message);
                throw;
            }
        }

        public async Task<IEnumerable<FreqReadingDto>> GetReadings(int limit)
        {
            var readings = await _repository.GetReadings(limit);
            return _mapper.Map<IEnumerable<FreqReadingDto>>(readings);
        }

        public async Task<FreqReadingDto> GetLatestReading()
        {
            var reading = await _repository.GetLatestReading();
            return _mapper.Map<FreqReadingDto>(reading);
        }

        private static async Task<HttpResponseMessage> CallUrl(string fullUrl)
        {
            HttpClient client = new HttpClient();
            var response = await client.GetAsync(fullUrl);
            return response;
        }
    }
}