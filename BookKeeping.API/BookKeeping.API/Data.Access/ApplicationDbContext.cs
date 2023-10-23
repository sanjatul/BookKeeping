using BookKeeping.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BookKeeping.API.Data.Access
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
       : base(options)
        {
        }
        public virtual DbSet<Bookkeeping> Bookkeeping { get; set; }

        public virtual DbSet<IncomeOrExpense> IncomeOrExpense { get; set; }

        public virtual DbSet<IncomeOrExpenseType> IncomeOrExpenseType { get; set; }
    }
}
