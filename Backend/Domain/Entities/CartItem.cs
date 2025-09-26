namespace Backend.Domain.Entities;

public class CartItem
{
    public Guid CartItemId { get; set; }
    public Guid CartId { get; set; }
    public Guid VariantId { get; set; }
    public int Quantity { get; set; }
    public string Notes { get; set; } = string.Empty;
    
    public Cart Cart { get; set; } = null!;
    public MerchandiseVariant Variant { get; set; } = null!;
}