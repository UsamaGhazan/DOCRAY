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
import DoctorsListScreen from './Screens/DoctorScreens/DoctorsListScreen';
import DoctorDetailScreen from './Screens/DoctorScreens/DoctorDetailScreen';
import PatientLoginScreen from './Screens/PatientScreens/PatientLoginScreen';
import PatientRegisterScreen from './Screens/PatientScreens/PatientRegisterScreen';
import PaymentScreen from './Screens/PatientScreens/PaymentScreen';
import AboutScreen from './Screens/AboutScreen';
import Navbar from './Components/Navbar';
import ContactUsScreen from './Screens/ContactUsScreen';
import PneumoniaDocScreen from './Screens/DoctorScreens/PneumoniaDocScreen';
import TbDocScreen from './Screens/DoctorScreens/TbDocScreen';
import PatientBookAppointmentScreen from './Screens/PatientScreens/PatientBookAppointmentScreen';
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
          <Route
            path="/doctors/bookAppointment/:id"
            element={<PatientBookAppointmentScreen />}
          />
          = <Route path="/login" element={<PatientLoginScreen />} />={' '}
          <Route path="/register" element={<PatientRegisterScreen />} />={' '}
          <Route path="/payment/:id" element={<PaymentScreen />} />={' '}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
