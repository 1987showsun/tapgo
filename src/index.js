/*
 *   Copyright (c) 2022 
 *   All rights reserved.
 */
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector } from 'react-redux';
import './index.scss';
import 'antd/dist/antd.css';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import createStore from './redux/store';

// Pages
import Sign from './pages/sign';
import SignIn from './pages/sign/in';
import SignUp from './pages/sign/up';
import Admin from './pages/admin';
import Dashboard from './pages/admin/dashboard';
import Order from './pages/admin/order';

const App = () => {

  const AUTH_TOKEN = useSelector(state => state.sign.token);
  
  return(
    <>
      <Routes>
        {
          AUTH_TOKEN==="" ?(
            <>
              <Route path="/sign/*" element={<Sign />}>
                <Route path="in" element={<SignIn />} />
                <Route path="up" element={<SignUp />} />
                <Route path="*" element={<Navigate to="/sign/in" />} />
              </Route>
            </>
          ):(
            <>
              <Route path="/admin/*" element={<Admin />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="order" element={<Order />} />
                <Route path="*" element={<Navigate to="/admin/dashboard" />} />
              </Route>
            </>
          )
        }
        <Route path="*" element={<Navigate to={ AUTH_TOKEN===""? '/sign/in':'/admin/dashboard' } />} />
      </Routes>
    </>
  );
}


ReactDOM.render(
  <StrictMode>
    <Provider store={createStore()}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
