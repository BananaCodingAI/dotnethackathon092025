namespace Backend.Application.DTOs;

public class CartDto
{
    public Guid CartId { get; set; }
    public List<CartItemDto> Items { get; set; } = new();
    public decimal TotalBBcoin { get; set; }
}

public class CartItemDto
{
    public Guid CartItemId { get; set; }
    public Guid VariantId { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public string VariantLabel { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalPrice { get; set; }
    public string Notes { get; set; } = string.Empty;
}

public class AddToCartDto
{
    public Guid VariantId { get; set; }
    public int Quantity { get; set; }
    public string Notes { get; set; } = string.Empty;
}