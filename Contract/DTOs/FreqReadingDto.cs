namespace Contract.DTOs
{
    public class FreqReadingDto
    {
        public int Id { get; set; }
        public DateTimeOffset Timestamp { get; set; }
        public float Frequency { get; set; }
    }
}
