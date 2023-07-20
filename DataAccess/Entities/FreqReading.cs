namespace DataAccess.Entities
{
    public class FreqReading
    {
        public int Id { get; set; }
        public DateTimeOffset Timestamp { get; set; }
        public float Frequency { get; set; }
    }
}
