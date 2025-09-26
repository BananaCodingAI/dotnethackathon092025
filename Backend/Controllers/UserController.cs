using Backend.Application.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/me")]
public class UserController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        // Mock implementation - in real app, get from JWT token
        var user = new UserDto
        {
            UserId = Guid.NewGuid(),
            Email = "admin@company.com",
            DisplayName = "Admin User",
            Role = Domain.Enums.UserRole.Admin,
            BBcoinBalance = 1000
        };

        return Ok(user);
    }
}