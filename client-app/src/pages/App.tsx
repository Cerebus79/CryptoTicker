import React, { useEffect } from 'react';
import TickerList from '../components/TickerList';
import NavBar from '../layouts/NavBar';
import { useStore } from '../stores/store';
import {observer} from 'mobx-react-lite';
import LoadingComponent from '../components/LoadingComponent';


function App() { 

  
  const {cryptStore} = useStore();
  
  useEffect(()=>{
    cryptStore.LoadTokens();
    cryptStore.AutoUpdate();
  },[cryptStore])

  if(cryptStore.loadingInitial) return <LoadingComponent content='Loading app..' /> 

  return (
    <div className="App">
      <NavBar />

            <TickerList />
      
    </div>
  );
}

export default observer(App);
