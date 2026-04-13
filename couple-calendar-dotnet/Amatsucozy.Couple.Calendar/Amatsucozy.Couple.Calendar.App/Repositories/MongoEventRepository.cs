using Amatsucozy.Couple.Calendar.App.Models;
using MongoDB.Driver;

namespace Amatsucozy.Couple.Calendar.App.Repositories;

public class MongoEventRepository : IEventRepository
{
    private readonly IMongoCollection<CalendarEventDocument> _col;

    public MongoEventRepository(IConfiguration config)
    {
        var settings = MongoClientSettings.FromConnectionString(config["MongoDB:ConnectionString"]);
        settings.ServerApi = new ServerApi(ServerApiVersion.V1);
        var client = new MongoClient(settings);
        var db = client.GetDatabase("coupleCalendar");
        _col = db.GetCollection<CalendarEventDocument>("events");

        var indexKeys = Builders<CalendarEventDocument>.IndexKeys
            .Ascending(e => e.UserId)
            .Ascending(e => e.DateKey);
        _col.Indexes.CreateOne(new CreateIndexModel<CalendarEventDocument>(indexKeys));
    }

    public async Task<IEnumerable<CalendarEventDocument>> GetAllAsync(string userId)
    {
        var filter = Builders<CalendarEventDocument>.Filter.Eq(e => e.UserId, userId);
        return await _col.Find(filter).ToListAsync();
    }

    public async Task<IEnumerable<CalendarEventDocument>> GetByDateAsync(string userId, string dateKey)
    {
        var filter = Builders<CalendarEventDocument>.Filter.And(
            Builders<CalendarEventDocument>.Filter.Eq(e => e.UserId, userId),
            Builders<CalendarEventDocument>.Filter.Eq(e => e.DateKey, dateKey));
        return await _col.Find(filter).ToListAsync();
    }

    public async Task InsertAsync(CalendarEventDocument doc)
    {
        await _col.InsertOneAsync(doc);
    }

    public async Task DeleteAsync(string userId, string id)
    {
        var filter = Builders<CalendarEventDocument>.Filter.And(
            Builders<CalendarEventDocument>.Filter.Eq(e => e.UserId, userId),
            Builders<CalendarEventDocument>.Filter.Eq(e => e.Id, id));
        await _col.DeleteOneAsync(filter);
    }
}
