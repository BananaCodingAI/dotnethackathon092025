namespace Backend.Domain.Entities;

public class Vendor
{
    public Guid VendorId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string ContactEmail { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string AddressJson { get; set; } = string.Empty;
}