import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
  Link,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import DoctorRegisterScreen from './Screens/DoctorScreens/DoctorRegisterScreen';
import DoctorLoginScreen from './Screens/DoctorScreens/DoctorLoginScreen';
import DashboardScreen from './Screens/DoctorScreens/DashboardScreen';
import DoctorAppointmentScreen from './Screens/DoctorScreens/DoctorAppointmentScreen';
import SetAvailabilityScreen from './Screens/DoctorScreens/SetAvailabilityScreen';
function App() {
  const { doctorInfo } = useSelector(store => store.doctorLogin);
  return (
    <BrowserRouter>
      {!doctorInfo && <Navbar />}

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
          <Route path="/login" element={<PatientLoginScreen />} />={' '}
          <Route path="/register" element={<PatientRegisterScreen />} />={' '}
          <Route path="/docRegister" element={<DoctorRegisterScreen />} />={' '}
          <Route path="/docLogin" element={<DoctorLoginScreen />} />={' '}
          <Route path="/payment/:id" element={<PaymentScreen />} />={' '}
          <Route path="/Dashboard" element={<DashboardScreen />} />={' '}
          <Route path="/docAppointment" element={<DoctorAppointmentScreen />} />
          <Route
            path="/setAvailability"
            element={<SetAvailabilityScreen />}
          />={' '}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
