using BookKeeping.API.Data.Access;
using BookKeeping.API.Models.Dtos;
using BookKeeping.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookKeeping.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
       
        private readonly ApplicationDbContext _context;

        public BaseController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetAllBookKeepingData")]
        public async Task<IActionResult> GetAllBookKeepingData()
        {
            if (_context.Bookkeeping == null)
            {
                return NotFound();
            }
            List<Bookkeeping> bookeepings= await _context.Bookkeeping.ToListAsync();
            List<IncomeOrExpenseType> incomeOrExpenseTypes = await _context.IncomeOrExpenseType.ToListAsync();

            var result = from bookeeping in bookeepings
                         join incomeOrExpenseType in incomeOrExpenseTypes
                         on bookeeping.IncomeOrExpenseTypeId equals incomeOrExpenseType.Id
                         select new BookkeepingDto
                         {
                             Id = bookeeping.Id,
                             YearMonth = (DateTime)bookeeping.YearMonth,
                             IncomeOrExpenseTypeId = incomeOrExpenseType.Id,
                             Name = incomeOrExpenseType.Name,
                             Type = incomeOrExpenseType.Type,
                             Amount = bookeeping.Amount
                         };

            List<BookkeepingDto> bookkeepingData = result.ToList();

            return Ok(bookkeepingData);
        }

        [HttpGet]
        [Route("GetAllIncomeAndExpenses")]
        public async Task<IActionResult> GetAllIncomeAndExpenses()
        {
            if (_context.IncomeOrExpense == null)
            {
                return NotFound();
            }

            List<IncomeOrExpense> incomeAndExpenses = await _context.IncomeOrExpense.ToListAsync();
            List<IncomeOrExpenseType> incomeOrExpenseTypes = await _context.IncomeOrExpenseType.ToListAsync();

            var result = from incomeOrExpense in incomeAndExpenses
                         join incomeOrExpenseType in incomeOrExpenseTypes
                         on incomeOrExpense.IncomeOrExpenseTypeId equals incomeOrExpenseType.Id
                         select new IncomeExpenseDto
                         {
                             YearMonth = (DateTime)incomeOrExpense.YearMonth,
                             Type = incomeOrExpenseType.Type,
                             Amount = incomeOrExpense.Amount
                         };

            List<IncomeExpenseDto> incomeExpenseData = result.ToList();
            return Ok(incomeExpenseData);
        }

        [HttpGet] 
        [Route("CreateBookKeepingData")]
        public async Task<IActionResult> CreateBookKeepingData([FromBody] CreateBookKeepingData data)
        {

            return Ok(data);
        }
    }
}
