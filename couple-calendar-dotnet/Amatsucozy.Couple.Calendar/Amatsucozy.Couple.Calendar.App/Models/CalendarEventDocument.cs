using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Amatsucozy.Couple.Calendar.App.Models;

public class CalendarEventDocument
{
    [BsonId]
    [BsonRepresentation(BsonType.String)]
    public string Id { get; set; } = string.Empty;

    public string UserId { get; set; } = string.Empty;

    public string DateKey { get; set; } = string.Empty;

    public string Period { get; set; } = string.Empty;

    public string ActivityId { get; set; } = string.Empty;

    public string? Note { get; set; }
}
