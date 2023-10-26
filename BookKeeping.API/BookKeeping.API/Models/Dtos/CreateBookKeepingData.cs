namespace BookKeeping.API.Models.Dtos
{
    public class CreateBookKeepingData
    {
        public string Id {  get; set; }
        public string YearMonth { get; set; }
        public string IncomeOrExpenseTypeId { get; set; }
        public string Amount { get; set; }
    }
}
