namespace BookKeeping.API.Models.Dtos
{
    public class IncomeExpenseDto
    {
        public DateTime YearMonth { get; set; }
        public int Type { get; set; }
        public decimal? Amount { get; set; }
    }
}
