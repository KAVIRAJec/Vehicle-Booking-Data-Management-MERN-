import React from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import './index.css'
import Login from './Auth/Login';
import Register from './Auth/Register';
import Dashboard from './pages/Dashboard';
import { Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext'
import Home from './pages/home';

const App = () => {
  const { isAuthenticated } = useAuth();

  return(
    
     <Router>
    <Routes>
      <Route 
        path="/" 
        element={!isAuthenticated ? <Register /> : <Navigate to="/home" />}
      />
      <Route 
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to="/home" />}
        />
      <Route 
        path="/home"
        element={isAuthenticated ? <Home /> : <Login />}
      />
    </Routes>
  </Router>
  );
};

export default App
