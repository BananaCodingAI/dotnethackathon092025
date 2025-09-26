namespace Backend.Domain.Entities;

public class MerchandiseVariant
{
    public Guid VariantId { get; set; }
    public Guid MerchandiseId { get; set; }
    public string VariantLabel { get; set; } = string.Empty;
    public string VendorSku { get; set; } = string.Empty;
    public string AdditionalNotes { get; set; } = string.Empty;
    public decimal PriceBBcoin { get; set; }
    
    public Merchandise Merchandise { get; set; } = null!;
}