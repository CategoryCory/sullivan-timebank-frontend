import React from 'react';
import { Routes, Route } from 'react-router-dom';
import About from './components/About';
import Footer from './components/Footer';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
