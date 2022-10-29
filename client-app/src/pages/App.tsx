import React, { useEffect, useState } from 'react';
import '../assets/styles/App.css';
import TickerCard from '../components/TickerCard';
import CryptToken from '../stores/cryptToken';



function App() { 

  const API_URL = 'https://api.coincap.io/v2/assets';


  const [tokens, setTokens] = useState<CryptToken[]>([]);
  
  useEffect(()=>{
    GetApi();
  },[tokens])
  
  
  const GetApi = async () =>
  {
  
    const resp = await fetch(`${API_URL}`,{method: 'GET',redirect:'follow'});
    if(resp.ok)
    {
      const data = await resp.json();
      setTokens(data.data);
    }
    else
    {
      console.log(`Fetch failed ${resp.status} ${resp.statusText}`);
    }
  }



  return (
    <div className="App">

            <TickerCard tickers={tokens} />

      
    </div>
  );
}

export default App;
