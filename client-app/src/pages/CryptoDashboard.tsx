import React from "react";
import {observer} from 'mobx-react-lite';
import TickerList from "../components/TickerList";


function CryptoDashboard()
{
    return(
        <>
         <TickerList />
        </>
    )
}

export default observer(CryptoDashboard)