import React, { useEffect } from "react";
import { useStore } from "../stores/store";
import { observer } from 'mobx-react-lite';
import '../assets/styles/index.css';
import LoadingComponent from "./LoadingComponent";
import ExchangeStruct from "../model/exchangeStruct";


const TableHead = () => {

    return (
        <>
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                <tr>
                    <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Rank</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Name</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Trading Pairs</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Volume 24hrs</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Exchange Url</div>
                    </th>
                </tr>
            </thead>
        </>
    )
}

const TableRow = observer(( exch:ExchangeStruct ) => {

    return(
        <> 
        <tr key={exch.exchangeId} >
        <td className="p-2 whitespace-nowrap" >
            <div className="text-left">{exch.rank}</div>
        </td>
        <td className="p-2 whitespace-nowrap">
            <div className="text-left font-medium text-green-500">
                {exch.tradingPairs}</div>
        </td>
        <td className="p-2 whitespace-nowrap">
            <div className="text-left">{exch.name}</div>
        </td>
        <td className="p-2 whitespace-nowrap">
            <div className="text-left font-medium text-green-500">
                {exch.volumeUsd}</div>
        </td>
        <td className="p-2 whitespace-nowrap">
            <div className="text-lg text-center"><a href={exch.exchangeUrl} target='new'>{exch.exchangeUrl}</a></div>
        </td>
    </tr>
    </>
    

    );
  
})

const TableContents = observer(() => {

    const {cryptStore} = useStore();
    const exchanges = Array.from(cryptStore.exchangeRegister.values());
   

    return (
        <>
            {
                exchanges?.length > 0 ? (
                    exchanges.map(e => (

                        <TableRow {...e} />
                    ))
                ) : (<tr><td colSpan={5}>No exchanges found</td></tr>)
            }
        </>
    )
})

export default observer(function ExchangeList() {

    const {cryptStore} = useStore();
  
    useEffect(()=>{
      cryptStore.LoadExchanges();
    },[cryptStore])
  
    if(cryptStore.loadingInitial) return <LoadingComponent content='Loading exchanges..' /> 
  

    return (
            <section className="flex flex-col justify-center antialiased bg-gray-100 text-gray-600 min-h-screen p-4">
                <div className="h-full">

                    <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                        <header className="px-5 py-4 border-b border-gray-100">
                            <h2 className="font-semibold text-gray-800">Exchanges</h2>
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


