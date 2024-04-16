import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css'
import Login from './Auth/Login';
import Register from './Auth/Register';
import Dashboard from './pages/Dashboard';
import { useAuth } from './contexts/AuthContext'
import { Navigate } from 'react-router-dom';

const App = () => {
  const { isAuthenticated } = useAuth();
  return(
     <Router>
    <Routes>
      <Route 
        path="/" 
        element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />}
      />
      <Route 
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
        />
      <Route 
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Login />}
      />
    </Routes>
  </Router>
  );
};

export default App
