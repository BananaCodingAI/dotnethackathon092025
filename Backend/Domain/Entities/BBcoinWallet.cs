namespace Backend.Domain.Entities;

public class BBcoinWallet
{
    public Guid WalletId { get; set; }
    public Guid UserId { get; set; }
    public decimal Balance { get; set; }
    public DateTime LastReconciledAt { get; set; }
    
    public User User { get; set; } = null!;
}