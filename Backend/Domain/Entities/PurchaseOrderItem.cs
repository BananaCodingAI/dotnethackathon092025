namespace Backend.Domain.Entities;

public class PurchaseOrderItem
{
    public Guid PurchaseOrderItemId { get; set; }
    public Guid PurchaseOrderId { get; set; }
    public Guid VariantId { get; set; }
    public int Quantity { get; set; }
    public decimal UnitBBcoinCost { get; set; }
    public string Description { get; set; } = string.Empty;
    
    public PurchaseOrder PurchaseOrder { get; set; } = null!;
    public MerchandiseVariant Variant { get; set; } = null!;
}