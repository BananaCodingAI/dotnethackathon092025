namespace Backend.Application.DTOs;

public class MerchandiseDto
{
    public Guid MerchandiseId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public decimal BasePriceBBcoin { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public VendorDto Vendor { get; set; } = null!;
    public List<MerchandiseVariantDto> Variants { get; set; } = new();
}

public class MerchandiseVariantDto
{
    public Guid VariantId { get; set; }
    public string VariantLabel { get; set; } = string.Empty;
    public string VendorSku { get; set; } = string.Empty;
    public decimal PriceBBcoin { get; set; }
}

public class VendorDto
{
    public Guid VendorId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string ContactEmail { get; set; } = string.Empty;
}