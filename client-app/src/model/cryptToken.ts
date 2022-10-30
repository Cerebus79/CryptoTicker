
export default class CryptToken
{

  id: string = "";
  rank: string = "";
  symbol: string = "";
  name: string = "";
  supply: number | string = "";
  maxSupply:  number | string = "";
  marketCapUsd:  number = 0;
  volumeUsd24Hr:  number = 0;
  priceUsd:  number | string = "";
  changePercent24Hr:  number = 0;
  vwap24Hr:  number = 0;

  constructor (){}

}