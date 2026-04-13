using Amatsucozy.Couple.Calendar.App.Extensions;
using Amatsucozy.Couple.Calendar.App.Models;
using Amatsucozy.Couple.Calendar.App.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Amatsucozy.Couple.Calendar.App.Controllers;

[ApiController]
[Route("api/events")]
public class CalendarEventController : ControllerBase
{
    private readonly IEventRepository _repo;

    public CalendarEventController(IEventRepository repo)
    {
        _repo = repo;
    }

    [HttpGet]
    [Authorize(Policy = "ReadEvents")]
    public async Task<IActionResult> GetEvents([FromQuery] string? dateKey)
    {
        var userId = User.GetUserId();
        var events = dateKey is null
            ? await _repo.GetAllAsync(userId)
            : await _repo.GetByDateAsync(userId, dateKey);
        return Ok(events);
    }

    [HttpPost]
    [Authorize(Policy = "WriteEvents")]
    public async Task<IActionResult> AddEvent([FromBody] CalendarEventDocument doc)
    {
        doc.UserId = User.GetUserId();
        await _repo.InsertAsync(doc);
        return Created($"api/events/{doc.Id}", doc);
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "DeleteEvents")]
    public async Task<IActionResult> DeleteEvent(string id)
    {
        await _repo.DeleteAsync(User.GetUserId(), id);
        return NoContent();
    }
}
