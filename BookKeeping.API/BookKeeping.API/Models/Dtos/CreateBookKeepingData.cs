namespace BookKeeping.API.Models.Dtos
{
    public class CreateBookKeepingData
    {
        public string YearMonth { get; set; }
        public int IncomeOrExpenseTypeId { get; set; }
        public decimal Amount { get; set; }
    }
}
