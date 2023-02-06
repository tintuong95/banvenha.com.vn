import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import 'antd/dist/reset.css';
import { BrowserRouter,  } from 'react-router-dom';
// import { router } from './routes';
import "./boostrap"
import AppRouter from './App';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter  >
    <AppRouter />
  </BrowserRouter>

);


