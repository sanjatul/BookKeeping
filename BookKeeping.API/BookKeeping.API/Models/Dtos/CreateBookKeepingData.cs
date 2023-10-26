namespace BookKeeping.API.Models.Dtos
{
    public class CreateBookKeepingData
    {
        public int Id {  get; set; }
        public int YearMonth { get; set; }
        public int IncomeOrExpenseTypeId { get; set; }
        public string Amount { get; set; }
    }
}
