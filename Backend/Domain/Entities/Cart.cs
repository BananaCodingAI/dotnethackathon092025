namespace Backend.Domain.Entities;

public class Cart
{
    public Guid CartId { get; set; }
    public Guid UserId { get; set; }
    public DateTime LastUpdated { get; set; }
    
    public User User { get; set; } = null!;
    public ICollection<CartItem> Items { get; set; } = new List<CartItem>();
}