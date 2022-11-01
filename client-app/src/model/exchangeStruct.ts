export default class ExchangeStruct
{
    
        exchangeId: string = '';
        name: string = '';
        rank: string = '';
        percentTotalVolume: number | string = '';
        volumeUsd:   number | string = '';
        tradingPairs:  string = '';
        socket:  boolean = false;
        exchangeUrl:  string = '';
        updated:  number = 0;
      
        constructor(){};
}