using System.Security.Claims;

namespace Amatsucozy.Couple.Calendar.App.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static string GetUserId(this ClaimsPrincipal user)
    {
        var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId is null)
        {
            throw new InvalidOperationException("User ID claim missing.");
        }
        return userId;
    }
}
