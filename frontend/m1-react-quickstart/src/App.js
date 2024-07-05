
import './App.css';

import * as React from 'react';
import Container from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Landing from './quickstart/Landing';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './quickstart/Home';
import Helmet from 'react-helmet';

function App() {
  return (

    <BrowserRouter>
     
      <Routes>
        <Route path="/" element={<Landing />}>   </Route>
        <Route path="home" element={<Home />}>
        </Route>


      </Routes>
    </BrowserRouter>


  );
}

export default App;

