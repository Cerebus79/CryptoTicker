import {makeAutoObservable, runInAction} from 'mobx';
import agent from '../middleware/api/agent';
import CryptToken from '../model/cryptToken';

export default class CryptStore
{
  
    tokensRegister = new Map<string, CryptToken>();
    loadingInitial = true;

    constructor(){
        makeAutoObservable(this);
    }

    
    //our auto refresh of the values every 5 seconds
    AutoUpdate = () =>
    {
      setInterval(()=>{
        this.LoadTokens();
      }, 2000);
    }

    FormatMoney = (n:number) =>{
      return new Intl.NumberFormat('en-US',
          {
              style: 'currency',
              currency: 'USD'
          }).format(n);
    }

    //Get the api data
    LoadTokens = async () =>
    {

        try
        {


            const cryptotokens = await agent.CryptoTokens.list();

            runInAction(()=>{
            
                cryptotokens.data.forEach(c => {
                    c.priceUsd = this.FormatMoney(c.priceUsd as number);
                    c.maxSupply = this.FormatMoney(c.maxSupply as number);
                    this.tokensRegister.set(c.id,c);
                });

                this.loadingInitial = false;
            })

        }
        catch(error)
        {
            console.log(error);
            
        }

        /*
      //non axios is commented
     const resp = await fetch(`${this.API_URL}`,{method: 'GET',redirect:'follow'});
      if(resp.ok)
      {
        const respJson = await resp.json();

        runInAction(()=>{
            
            const cryptTokens = <CryptToken[]>respJson.data; //type to CryptoTokens array
            
            //add the tokens to our state register
            cryptTokens.forEach(token => {
                this.tokensRegister.set(token.id, token)
                }
            )
            
        })
      
      }
      else
      {
        console.log(`Fetch failed ${resp.status} ${resp.statusText}`);
      }*/
    }
}