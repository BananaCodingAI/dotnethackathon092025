using Backend.Domain.Entities;
using Backend.Domain.Enums;

namespace Backend.Infrastructure.Data;

public static class MockData
{
    public static List<User> GetMockUsers()
    {
        return new List<User>
        {
            new User
            {
                UserId = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                Email = "admin@company.com",
                DisplayName = "Admin User",
                Role = UserRole.Admin,
                PasswordHash = "hashed_password", // In real app, hash the password
                CreatedAt = DateTime.UtcNow.AddDays(-30)
            },
            new User
            {
                UserId = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                Email = "shopper@company.com",
                DisplayName = "John Shopper",
                Role = UserRole.Shopper,
                PasswordHash = "hashed_password",
                CreatedAt = DateTime.UtcNow.AddDays(-15)
            }
        };
    }

    public static List<Vendor> GetMockVendors()
    {
        return new List<Vendor>
        {
            new Vendor
            {
                VendorId = Guid.Parse("33333333-3333-3333-3333-333333333333"),
                Name = "Apparel Co",
                ContactEmail = "orders@apparelco.com",
                Phone = "+1-555-0101",
                AddressJson = "{\"street\":\"123 Business Ave\",\"city\":\"Commerce City\",\"state\":\"CA\",\"zip\":\"90210\"}"
            },
            new Vendor
            {
                VendorId = Guid.Parse("44444444-4444-4444-4444-444444444444"),
                Name = "Office Supplies Ltd",
                ContactEmail = "orders@officesupplies.com",
                Phone = "+1-555-0102",
                AddressJson = "{\"street\":\"456 Supply St\",\"city\":\"Office Town\",\"state\":\"NY\",\"zip\":\"10001\"}"
            }
        };
    }

    public static List<Merchandise> GetMockMerchandise()
    {
        var vendors = GetMockVendors();
        
        return new List<Merchandise>
        {
            new Merchandise
            {
                MerchandiseId = Guid.Parse("55555555-5555-5555-5555-555555555555"),
                Name = "Corporate Hoodie",
                Description = "Comfortable hoodie with company logo. Made from premium cotton blend.",
                Category = "Apparel",
                BasePriceBBcoin = 150,
                VendorId = vendors[0].VendorId,
                ImageUrl = "https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Corporate+Hoodie",
                IsActive = true
            },
            new Merchandise
            {
                MerchandiseId = Guid.Parse("66666666-6666-6666-6666-666666666666"),
                Name = "Company Mug",
                Description = "Ceramic mug with company branding. Perfect for your morning coffee.",
                Category = "Office Supplies",
                BasePriceBBcoin = 25,
                VendorId = vendors[1].VendorId,
                ImageUrl = "https://via.placeholder.com/300x200/2196F3/FFFFFF?text=Company+Mug",
                IsActive = true
            },
            new Merchandise
            {
                MerchandiseId = Guid.Parse("77777777-7777-7777-7777-777777777777"),
                Name = "Corporate T-Shirt",
                Description = "Premium quality t-shirt with company logo. Available in multiple colors.",
                Category = "Apparel",
                BasePriceBBcoin = 50,
                VendorId = vendors[0].VendorId,
                ImageUrl = "https://via.placeholder.com/300x200/FF9800/FFFFFF?text=Corporate+T-Shirt",
                IsActive = true
            }
        };
    }

    public static List<MerchandiseVariant> GetMockMerchandiseVariants()
    {
        var merchandise = GetMockMerchandise();
        
        return new List<MerchandiseVariant>
        {
            // Hoodie variants
            new MerchandiseVariant
            {
                VariantId = Guid.Parse("88888888-8888-8888-8888-888888888888"),
                MerchandiseId = merchandise[0].MerchandiseId,
                VariantLabel = "Navy - M",
                VendorSku = "HOODIE-NAVY-M",
                PriceBBcoin = 150,
                AdditionalNotes = "Medium size, Navy color"
            },
            new MerchandiseVariant
            {
                VariantId = Guid.Parse("99999999-9999-9999-9999-999999999999"),
                MerchandiseId = merchandise[0].MerchandiseId,
                VariantLabel = "Navy - L",
                VendorSku = "HOODIE-NAVY-L",
                PriceBBcoin = 160,
                AdditionalNotes = "Large size, Navy color"
            },
            // Mug variant
            new MerchandiseVariant
            {
                VariantId = Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
                MerchandiseId = merchandise[1].MerchandiseId,
                VariantLabel = "White - Standard",
                VendorSku = "MUG-WHITE-STD",
                PriceBBcoin = 25,
                AdditionalNotes = "Standard size, White ceramic"
            },
            // T-Shirt variants
            new MerchandiseVariant
            {
                VariantId = Guid.Parse("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
                MerchandiseId = merchandise[2].MerchandiseId,
                VariantLabel = "Black - M",
                VendorSku = "TSHIRT-BLACK-M",
                PriceBBcoin = 50,
                AdditionalNotes = "Medium size, Black color"
            },
            new MerchandiseVariant
            {
                VariantId = Guid.Parse("cccccccc-cccc-cccc-cccc-cccccccccccc"),
                MerchandiseId = merchandise[2].MerchandiseId,
                VariantLabel = "White - M",
                VendorSku = "TSHIRT-WHITE-M",
                PriceBBcoin = 50,
                AdditionalNotes = "Medium size, White color"
            }
        };
    }

    public static List<BBcoinWallet> GetMockWallets()
    {
        var users = GetMockUsers();
        
        return new List<BBcoinWallet>
        {
            new BBcoinWallet
            {
                WalletId = Guid.Parse("dddddddd-dddd-dddd-dddd-dddddddddddd"),
                UserId = users[0].UserId,
                Balance = 1000,
                LastReconciledAt = DateTime.UtcNow
            },
            new BBcoinWallet
            {
                WalletId = Guid.Parse("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"),
                UserId = users[1].UserId,
                Balance = 500,
                LastReconciledAt = DateTime.UtcNow
            }
        };
    }
}