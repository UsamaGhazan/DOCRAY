import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';

import HomeScreen from './Screens/HomeScreen';
import DoctorsListScreen from './Screens/DoctorsListScreen';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Navbar from './Components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} />={' '}
          <Route path="/doctors" element={<DoctorsListScreen />} />={' '}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
