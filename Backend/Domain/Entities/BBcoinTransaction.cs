namespace Backend.Domain.Entities;

public class BBcoinTransaction
{
    public Guid TxnId { get; set; }
    public Guid WalletId { get; set; }
    public decimal AmountDelta { get; set; }
    public string Reason { get; set; } = string.Empty;
    public string? ReferenceId { get; set; }
    public DateTime CreatedAt { get; set; }
    
    public BBcoinWallet Wallet { get; set; } = null!;
}