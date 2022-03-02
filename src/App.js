import React from 'react';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home';
import Navbar from './Navbar';
import Register from './Register';
import Login from './Login';
import AuthProvider from './context/auth';
import PrivateRoute from './PrivateRoute';
import Profile from './Profile';

function App() {
  return (
    <AuthProvider>
    <div className="App">
      <BrowserRouter>

        <Navbar/>
        <Routes>
          <Route exact path="/" element={<PrivateRoute><Home/></PrivateRoute>}></Route>
          <Route exact path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>}></Route>
          <Route path='/register' element={<Register/> }/>
          <Route path='/login' element={<Login/> }/>
        </Routes>
      </BrowserRouter>
     
    </div>
    
    </AuthProvider>
  );
}

export default App;
