import React, { useEffect } from 'react';
import '../assets/styles/App.css';
import TickerList from '../components/TickerList';
import NavBar from '../layouts/NavBar';
import { useStore } from '../stores/store';
import {observer} from 'mobx-react-lite';


function App() { 

  
  const {cryptStore} = useStore();
  
  useEffect(()=>{
    cryptStore.LoadTokens();
    cryptStore.AutoUpdate();
  },[cryptStore])


  return (
    <div className="App">
      <NavBar />

            <TickerList />
      
    </div>
  );
}

export default observer(App);
