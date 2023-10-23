namespace BookKeeping.API.Models
{
    public class IncomeOrExpenseType
    {
        public int Id { get; set; }

        public string Name { get; set; }

        /// <summary>
        /// Income = 1, Expense = 2
        /// </summary>
        public int Type { get; set; }
    }
}
