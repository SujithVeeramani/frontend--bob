import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './home';
import Login from './login';
import Signup from './signup'
import './App.css';
import LandingPage from './landingpage'; 
import { useEffect, useState } from 'react';
const App = () => {
  return (
      <BrowserRouter>
          <Routes>
          <Route
                  path="/"
                  element={<LandingPage/>}
              />
              <Route
                  path="/login"
                  element={<Login />}
              />
              <Route
                  path="/signup"
                  element={<Signup/>}
              />
              
            
            <Route path="/home" element={<Home />} />
              </Routes>
      </BrowserRouter>
  );
};
export default App;