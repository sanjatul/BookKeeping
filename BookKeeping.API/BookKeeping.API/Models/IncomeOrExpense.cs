using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookKeeping.API.Models
{
    public class IncomeOrExpense
    {
        public int Id { get; set; }

        public int? IncomeOrExpenseTypeId { get; set; }

        public DateTime? YearMonth { get; set; }

        public decimal? Amount { get; set; }
    }
}
