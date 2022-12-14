import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './assets/styles/index.css';
import App from './layouts/App';
import reportWebVitals from './reportWebVitals';
import { store, StoreContext } from './stores/store';
import { ThemeProvider } from "@material-tailwind/react";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  //disabled due to mobx double render bug breaking the tickerlist flash effect. Doesnt happen in production.
 <React.StrictMode> 
    <StoreContext.Provider value={store}>

    <div style={{marginTop:'4.2em'}}>
      <BrowserRouter>
      <ThemeProvider>
      <App />
      </ThemeProvider>
    </BrowserRouter>
    </div>
    </StoreContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
