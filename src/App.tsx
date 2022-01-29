import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AboutPage from './components/AboutPage';
import Homepage from './components/Homepage';
import Login from "./components/account/Login";
import Register from "./components/account/Register";
import Layout from './components/layout/Layout';
import Jobs from './components/jobs/Jobs';
import ModalContainer from './components/common/modals/ModalContainer';

function App() {
  return (
    <>
      <ModalContainer />
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
