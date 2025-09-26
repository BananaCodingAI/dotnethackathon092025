using Backend.Domain.Enums;

namespace Backend.Application.DTOs;

public class UserDto
{
    public Guid UserId { get; set; }
    public string Email { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public UserRole Role { get; set; }
    public decimal BBcoinBalance { get; set; }
}