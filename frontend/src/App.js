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
import PaymentScreen from './Screens/PaymentScreen';
import AboutScreen from './Screens/AboutScreen';
import Navbar from './Components/Navbar';
import ContactUsScreen from './Screens/ContactUsScreen';
import PneumoniaDocScreen from './Screens/PneumoniaDocScreen';
import TbDocScreen from './Screens/TbDocScreen';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} />={' '}
          <Route path="/about" element={<AboutScreen />} />={' '}
          <Route path="/contact" element={<ContactUsScreen />} />={' '}
          <Route path="/doctors" element={<DoctorsListScreen />} />={' '}
          <Route path="/pneumoniaDoctors" element={<PneumoniaDocScreen />} />={' '}
          <Route path="/TbDoctors" element={<TbDocScreen />} />={' '}
          <Route path="/doctors/:id" element={<DoctorDetailScreen />} />={' '}
          <Route path="/login" element={<PatientLoginScreen />} />={' '}
          <Route path="/register" element={<PatientRegisterScreen />} />={' '}
          <Route path="/payment/:id" element={<PaymentScreen />} />={' '}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
