import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AboutPage from './components/AboutPage';
import Homepage from './components/Homepage';
import Login from "./components/Login";
import Register from "./components/Register";
import Layout from './components/Layout';
import Jobs from './components/Jobs';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/jobs" element={<Jobs />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
