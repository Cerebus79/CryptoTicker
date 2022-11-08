namespace Domain;
public class WatchList
{
    public Guid Id { get; set; }

    public string User { get; set; }
    public string CryptoSymbol { get; set; }
    public string DateWatched { get; set; }
    public string PriceWhenWatched { get; set; }


}
