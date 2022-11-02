import React, { useEffect } from "react";
import CryptToken from "../model/cryptToken";
import defaultIcon from '../assets/images/bitcoin_iconv2.jpg'
import { useStore } from "../stores/store";
import { observer } from 'mobx-react-lite';
import '../assets/styles/index.css';
import LoadingComponent from "./LoadingComponent";


const TableHead = () => {

    return (
        <>
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                <tr>
                    <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Rank</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Symbol</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Name</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Price $</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Max Supply</div>
                    </th>
                </tr>
            </thead>
        </>
    )
}

const TickerIcon = observer(({ name, symbol }: CryptToken) => {
    const tickerIcon: string = `https://cryptocurrencyliveprices.com/img/${symbol.toLowerCase()}-${name.toLowerCase().replace(' ', '-')}.png`;

    return (
        <>
            <img className="rounded-full" src={tickerIcon} width="40" height="40" alt={name} 
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src=defaultIcon;
              }} />
        </>
    )
})


const TableRow = observer(( token:CryptToken ) => {

    const rowStyling = {
        backgroundColor: token.changed ? "lightblue" : ""
    }

    const pulseRow = token.changed ? "animation-pulse" : ""  

    if(token.changed)
        console.log(token.id + ' flag ' + token.changed + ' ' + token.priceUsd);


    return(
        
        <tr key={token.id} className={`transition duration-700 ease-in-out ${pulseRow}`} style={rowStyling}>
        <td className="p-2 whitespace-nowrap" >
            <div className="text-left">{token.rank}</div>
        </td>
        <td className="p-2 whitespace-nowrap">
            <div className="flex items-center">
                <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                    <TickerIcon {...token} />
                </div>
                <div className="font-medium text-gray-800">{token.symbol}</div>
            </div>
        </td>
        <td className="p-2 whitespace-nowrap">
            <div className="text-left">{token.name}</div>
        </td>
        <td className="p-2 whitespace-nowrap">
            <div className="text-left font-medium text-green-500">
                {token.priceUsd}</div>
        </td>
        <td className="p-2 whitespace-nowrap">
            <div className="text-lg text-center">{token.maxSupply}</div>
        </td>
    </tr>
    
    

    );
  
})

const TableContents = observer(() => {

    const {cryptStore} = useStore();
    const tickers = Array.from(cryptStore.tokensRegister.values());

    return (
        <>
            {
                tickers?.length > 0 ? (
                    tickers.map(e => (

                        <TableRow {...e} />
                    ))
                ) : (<tr><td colSpan={5}>No tickers found</td></tr>)
            }
        </>
    )
})

export default observer(function TickerList() {

    const {cryptStore} = useStore();

    useEffect(()=>{
        cryptStore.LoadTokens();
        cryptStore.AutoUpdate();
      },[cryptStore])
  
    if(cryptStore.loadingInitial) return <LoadingComponent content='Loading app..' /> 
  

    return (
            <section className="flex flex-col justify-center antialiased bg-gray-100 text-gray-600 min-h-screen p-4">
                <div className="h-full">

                    <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                        <header className="px-5 py-4 border-b border-gray-100">
                            <h2 className="font-semibold text-gray-800">Coins/Tokens</h2>
                        </header>
                        <div className="p-3">
                            <div className="overflow-x-auto">
                                <table className="table-auto w-full">

                                    <TableHead />

                                    <tbody className="text-sm divide-y divide-gray-100">
                                        <TableContents />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        
    )
})


