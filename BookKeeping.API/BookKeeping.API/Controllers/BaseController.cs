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

        [HttpPost] 
        [Route("ModifyBookKeepingData")]
        public async Task<IActionResult> ModifyBookKeepingData([FromBody]CreateBookKeepingData data)
        {

            if(data == null) { return NotFound(); }
            if (data.Id == 0)
            {
                //For Creating
                var bookkeeping = new Bookkeeping
                {
                    Id=data.Id,
                    YearMonth= GenerateDate(data.Month),
                    Amount =data.Amount,
                    IncomeOrExpenseTypeId = data.IncomeOrExpenseTypeId,

                };
                await _context.Bookkeeping.AddAsync(bookkeeping);
                await _context.SaveChangesAsync();
                return Ok(bookkeeping);
            }
            else
            {
                //For Updating
                var bookeeping =await _context.Bookkeeping.FirstOrDefaultAsync(x=>x.Id==data.Id);
                if(bookeeping== null) return NotFound();
                bookeeping.Amount = data.Amount;
                _context.Bookkeeping.Update(bookeeping);
                await _context.SaveChangesAsync();
                return Ok(bookeeping);
                
            }
        }
        public static DateTime GenerateDate(int month)
        {
            // Ensure that the month is within a valid range (1-12)
            if (month < 1 || month > 12)
            {
                throw new ArgumentOutOfRangeException("Month should be between 1 and 12.");
            }

            // Create a DateTime object with the year set to 2021 and the specified month
            return new DateTime(2021, month, 1);
        }
    }
}
