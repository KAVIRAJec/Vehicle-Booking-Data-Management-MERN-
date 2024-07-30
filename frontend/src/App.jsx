import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom';

import './index.css'

import { useAuth } from './contexts/AuthContext'

import Login from './Auth/Login';
import Register from './Auth/Register';
import Home from './pages/home';
import CreateVehicleDriverPage from './pages/CreateVehicleDriver';
import VehicleMaster from './pages/vehicleMaster';
import DriverMaster from './pages/driverMaster';
import CreateVehiclePage from './pages/CreateVehicle';
import CreateDriverPage from './pages/CreateDriver';

const App = () => {
  const { isAuthenticated } = useAuth();

  return (

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
        <Route
          path="/vehicleDriverMaster/create" element={<CreateVehicleDriverPage />}
        />
        <Route
          path="/vehicleMaster" element={<VehicleMaster />}
        />
        <Route
          path="/vehicle/create" element={<CreateVehiclePage />}
        />
        <Route
          path="/driverMaster" element={<DriverMaster />}
        />
        <Route
          path="/driver/create" element={<CreateDriverPage />}
        />
      </Routes>
    </Router>
  );
};

export default App
