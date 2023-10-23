namespace BookKeeping.API.Models.Dtos
{
    public class BookkeepingDto
    {
        public int Id { get; set; }
        public DateTime YearMonth { get; set; }
        public int IncomeOrExpenseTypeId { get; set; }
        public string Name { get; set; }
        public int Type { get; set; }
        public decimal? Amount { get; set; }
    }
}
