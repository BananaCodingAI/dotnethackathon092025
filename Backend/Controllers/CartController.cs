using Backend.Application.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private static readonly List<CartItemDto> MockCartItems = new();

    [HttpGet]
    public async Task<ActionResult<CartDto>> GetCart()
    {
        var cart = new CartDto
        {
            CartId = Guid.NewGuid(),
            Items = MockCartItems,
            TotalBBcoin = MockCartItems.Sum(item => item.TotalPrice)
        };

        return Ok(cart);
    }

    [HttpPost("items")]
    public async Task<ActionResult<CartItemDto>> AddToCart([FromBody] AddToCartDto addToCartDto)
    {
        var cartItem = new CartItemDto
        {
            CartItemId = Guid.NewGuid(),
            VariantId = addToCartDto.VariantId,
            ProductName = "Corporate Hoodie", // Mock data
            VariantLabel = "Navy - M", // Mock data
            Quantity = addToCartDto.Quantity,
            UnitPrice = 150, // Mock price
            TotalPrice = 150 * addToCartDto.Quantity,
            Notes = addToCartDto.Notes
        };

        MockCartItems.Add(cartItem);
        return Ok(cartItem);
    }

    [HttpPatch("items/{itemId}")]
    public async Task<ActionResult<CartItemDto>> UpdateCartItem(Guid itemId, [FromBody] UpdateCartItemDto updateDto)
    {
        var item = MockCartItems.FirstOrDefault(i => i.CartItemId == itemId);
        if (item == null)
        {
            return NotFound();
        }

        item.Quantity = updateDto.Quantity;
        item.TotalPrice = item.UnitPrice * updateDto.Quantity;
        item.Notes = updateDto.Notes ?? item.Notes;

        return Ok(item);
    }

    [HttpDelete("items/{itemId}")]
    public async Task<IActionResult> RemoveFromCart(Guid itemId)
    {
        var item = MockCartItems.FirstOrDefault(i => i.CartItemId == itemId);
        if (item == null)
        {
            return NotFound();
        }

        MockCartItems.Remove(item);
        return NoContent();
    }
}

public class UpdateCartItemDto
{
    public int Quantity { get; set; }
    public string? Notes { get; set; }
}