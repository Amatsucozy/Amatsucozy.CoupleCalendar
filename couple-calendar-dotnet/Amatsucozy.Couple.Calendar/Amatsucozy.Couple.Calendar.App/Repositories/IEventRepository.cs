using Amatsucozy.Couple.Calendar.App.Models;

namespace Amatsucozy.Couple.Calendar.App.Repositories;

public interface IEventRepository
{
    Task<IEnumerable<CalendarEventDocument>> GetAllAsync(string userId);
    Task<IEnumerable<CalendarEventDocument>> GetByDateAsync(string userId, string dateKey);
    Task InsertAsync(CalendarEventDocument doc);
    Task DeleteAsync(string userId, string id);
}
