
import './App.css';

import * as React from 'react';
import Landing from './quickstart/Landing';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './quickstart/Home';

function App() {
  return (

    <BrowserRouter>
     
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="home" element={<Home />}></Route>
      </Routes>
      
    </BrowserRouter>

  );
}

export default App;

