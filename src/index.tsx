import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './contexts/authContext';
import { BrowserRouter } from 'react-router-dom';
import { store, StoreContext } from "./stores/store";
import "react-toastify/dist/ReactToastify.min.css";
import './index.css';
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <StoreContext.Provider value={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StoreContext.Provider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
