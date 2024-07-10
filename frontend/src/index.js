import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from "firebase/app";
import firebaseConfig from './Pages/firebase-config.js';
import "./index.css"


const firebaseApp = initializeApp(firebaseConfig);
  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);