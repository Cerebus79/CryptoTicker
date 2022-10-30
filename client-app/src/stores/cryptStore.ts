import {makeAutoObservable, runInAction} from 'mobx';
import CryptToken from './cryptToken';

export default class CryptStore
{
    API_URL:string = 'https://api.coincap.io/v2/assets';
    tokensRegister = new Map<string, CryptToken>();

    constructor(){
        makeAutoObservable(this);
    }

    
    //our auto refresh of the values every 5 seconds
    AutoUpdate = () =>
    {
      setInterval(()=>{
        this.GetApi();
      }, 5000);
    }
    
    //Get the api data
    GetApi = async () =>
    {
    
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
      }
    }
}