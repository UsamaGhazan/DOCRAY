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
import DoctorDetailScreen from './Screens/DoctorDetailScreen';
import PatientLoginScreen from './Screens/PatientLoginScreen';
import PatientRegisterScreen from './Screens/PatientRegisterScreen';
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
          <Route path="/doctors/:id" element={<DoctorDetailScreen />} />={' '}
          <Route path="/login" element={<PatientLoginScreen />} />={' '}
          <Route path="/register" element={<PatientRegisterScreen />} />={' '}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
