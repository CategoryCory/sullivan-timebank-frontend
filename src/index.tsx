import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import { AuthProvider } from './contexts/authContext';
import { BrowserRouter } from 'react-router-dom';
import { store, StoreContext } from "./stores/store";
import "react-toastify/dist/ReactToastify.min.css";
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    {/* <AuthProvider> */}
      <StoreContext.Provider value={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StoreContext.Provider>
    {/* </AuthProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);
