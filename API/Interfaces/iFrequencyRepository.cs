using API.Entities;

namespace API.Interfaces
{
    public interface iFrequencyRepository
    {
        float Update(FreqReading reading);
    }
}