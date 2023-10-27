namespace BookKeeping.API.Models.Dtos
{
    public class CreateBookKeepingData
    {
        public int Id {  get; set; }
        public int Month { get; set; }
        public int IncomeOrExpenseTypeId{ get; set; }
        public decimal Amount { get; set; }
    }
}
