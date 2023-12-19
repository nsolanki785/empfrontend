import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Athentification from './contexts/authentificationContext';
import { ToastContainer } from 'react-toastify';
import UserDetails from './contexts/userDetails';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Athentification>
      <UserDetails>
        <App />
      </UserDetails>
      <ToastContainer />
    </Athentification>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
