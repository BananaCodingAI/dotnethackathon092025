namespace Backend.Domain.Entities;

public class Merchandise
{
    public Guid MerchandiseId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public decimal BasePriceBBcoin { get; set; }
    public Guid VendorId { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    
    public Vendor Vendor { get; set; } = null!;
    public ICollection<MerchandiseVariant> Variants { get; set; } = new List<MerchandiseVariant>();
}