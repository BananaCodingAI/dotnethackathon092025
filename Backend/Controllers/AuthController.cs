using Backend.Application.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    [HttpPost("login")]
    public async Task<ActionResult<LoginResponseDto>> Login([FromBody] LoginDto loginDto)
    {
        // Mock implementation - replace with actual authentication logic
        if (loginDto.Email == "admin@company.com" && loginDto.Password == "password")
        {
            var response = new LoginResponseDto
            {
                Token = "mock-jwt-token",
                User = new UserDto
                {
                    UserId = Guid.NewGuid(),
                    Email = loginDto.Email,
                    DisplayName = "Admin User",
                    Role = Domain.Enums.UserRole.Admin,
                    BBcoinBalance = 1000
                }
            };
            return Ok(response);
        }
        
        return Unauthorized("Invalid credentials");
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        // Mock implementation
        return Ok(new { message = "Logged out successfully" });
    }
}