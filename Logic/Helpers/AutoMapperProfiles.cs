using DataAccess.Entities;
using AutoMapper;
using Contract.DTOs;

namespace Logic.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<FreqReading, FreqReadingDto>();
        }
    }
}
