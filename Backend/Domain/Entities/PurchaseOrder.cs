using Backend.Domain.Enums;

namespace Backend.Domain.Entities;

public class PurchaseOrder
{
    public Guid PurchaseOrderId { get; set; }
    public string PoNumber { get; set; } = string.Empty;
    public Guid UserId { get; set; }
    public Guid VendorId { get; set; }
    public PurchaseOrderStatus Status { get; set; }
    public decimal TotalBBcoin { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? SentAt { get; set; }
    public DateTime? FulfilledAt { get; set; }
    public string ShippingAddress { get; set; } = string.Empty;
    public string Notes { get; set; } = string.Empty;
    
    public User User { get; set; } = null!;
    public Vendor Vendor { get; set; } = null!;
    public ICollection<PurchaseOrderItem> Items { get; set; } = new List<PurchaseOrderItem>();
}