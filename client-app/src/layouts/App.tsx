import React from 'react';
import NavBar from './NavBar';
import {observer} from 'mobx-react-lite';
import CryptoDashboard from '../pages/CryptoDashboard';
import { Route, Routes } from 'react-router-dom';
import Exchanges from '../pages/Exchanges';
import About from '../pages/About';

function App() { 

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<CryptoDashboard />} />
        <Route path='/exchanges' element={<Exchanges />} />
        <Route path='/about' element={<About />} />  
      </Routes>
    </div>
  );
}

export default observer(App);
