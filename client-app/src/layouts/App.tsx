import React from 'react';
import {observer} from 'mobx-react-lite';
import CryptoDashboard from '../pages/CryptoDashboard';
import { Route, Routes } from 'react-router-dom';
import Exchanges from '../pages/Exchanges';
import About from '../pages/About';
import LoginPage from '../pages/LoginPage';
import NavBartw from './menu/NavBartw';

function App() { 

  return (
    <div className="App">
      <NavBartw />
      <Routes>
        <Route path='/' element={<CryptoDashboard />} />
        <Route path='/exchanges' element={<Exchanges />} />
        <Route path='/about' element={<About />} />  
        <Route path='/login' element={<LoginPage />} />  

      </Routes>
    </div>
  );
}

export default observer(App);
