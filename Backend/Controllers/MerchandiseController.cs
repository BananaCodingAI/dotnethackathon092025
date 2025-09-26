using Backend.Application.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MerchandiseController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<MerchandiseDto>>> GetMerchandise([FromQuery] string? category = null)
    {
        // Mock data
        var mockMerchandise = new List<MerchandiseDto>
        {
            new MerchandiseDto
            {
                MerchandiseId = Guid.NewGuid(),
                Name = "Corporate Hoodie",
                Description = "Comfortable hoodie with company logo",
                Category = "Apparel",
                BasePriceBBcoin = 150,
                ImageUrl = "/assets/images/hoodie.jpg",
                Vendor = new VendorDto
                {
                    VendorId = Guid.NewGuid(),
                    Name = "Apparel Co",
                    ContactEmail = "orders@apparelco.com"
                },
                Variants = new List<MerchandiseVariantDto>
                {
                    new MerchandiseVariantDto
                    {
                        VariantId = Guid.NewGuid(),
                        VariantLabel = "Navy - M",
                        VendorSku = "HOODIE-NAVY-M",
                        PriceBBcoin = 150
                    },
                    new MerchandiseVariantDto
                    {
                        VariantId = Guid.NewGuid(),
                        VariantLabel = "Navy - L",
                        VendorSku = "HOODIE-NAVY-L",
                        PriceBBcoin = 160
                    }
                }
            },
            new MerchandiseDto
            {
                MerchandiseId = Guid.NewGuid(),
                Name = "Company Mug",
                Description = "Ceramic mug with company branding",
                Category = "Office Supplies",
                BasePriceBBcoin = 25,
                ImageUrl = "/assets/images/mug.jpg",
                Vendor = new VendorDto
                {
                    VendorId = Guid.NewGuid(),
                    Name = "Office Supplies Ltd",
                    ContactEmail = "orders@officesupplies.com"
                },
                Variants = new List<MerchandiseVariantDto>
                {
                    new MerchandiseVariantDto
                    {
                        VariantId = Guid.NewGuid(),
                        VariantLabel = "White - Standard",
                        VendorSku = "MUG-WHITE-STD",
                        PriceBBcoin = 25
                    }
                }
            }
        };

        if (!string.IsNullOrEmpty(category))
        {
            mockMerchandise = mockMerchandise.Where(m => m.Category.Contains(category, StringComparison.OrdinalIgnoreCase)).ToList();
        }

        return Ok(mockMerchandise);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<MerchandiseDto>> GetMerchandiseById(Guid id)
    {
        // Mock implementation - return first item with updated ID
        var merchandise = new MerchandiseDto
        {
            MerchandiseId = id,
            Name = "Corporate Hoodie",
            Description = "Comfortable hoodie with company logo. Made from premium cotton blend.",
            Category = "Apparel",
            BasePriceBBcoin = 150,
            ImageUrl = "/assets/images/hoodie.jpg",
            Vendor = new VendorDto
            {
                VendorId = Guid.NewGuid(),
                Name = "Apparel Co",
                ContactEmail = "orders@apparelco.com"
            },
            Variants = new List<MerchandiseVariantDto>
            {
                new MerchandiseVariantDto
                {
                    VariantId = Guid.NewGuid(),
                    VariantLabel = "Navy - M",
                    VendorSku = "HOODIE-NAVY-M",
                    PriceBBcoin = 150
                },
                new MerchandiseVariantDto
                {
                    VariantId = Guid.NewGuid(),
                    VariantLabel = "Navy - L",
                    VendorSku = "HOODIE-NAVY-L",
                    PriceBBcoin = 160
                }
            }
        };

        return Ok(merchandise);
    }
}