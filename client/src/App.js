import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import RegistrationForm from './Pages/AuthPages/Register';
import LoginForm from './Pages/AuthPages/Login';
import Home from './Pages/Home.js';
import UserDashboard from './Pages/UserPages/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {

  return (
    <Router>
      <Routes>
        {/* <Route path={["/", "/home"]} element={<Home />}></Route> */}
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/register" element={<RegistrationForm />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/:username" element={<UserDashboard />}></Route>
      </Routes>
    </Router>
  );
}

export default App;