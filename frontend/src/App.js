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
import DoctorAppointmentScreen from './Screens/DoctorScreens/DoctorAppointmentScreen';
import SetAvailabilityScreen from './Screens/DoctorScreens/SetAvailabilityScreen';
import ChatScreen from './Screens/ChatScreen';
import PneumoniaDetectionScreen from './Screens/PatientScreens/PneumoniaDetectionScreen';
import VideoCallScreen from './Screens/VideoCallScreen';
import AppointmentSuccessScreen from './Screens/PatientScreens/AppointmentSuccessScreen';
import ReportGenerationScreen from './Screens/PatientScreens/ReportGenerationScreen';
import AIInfoScreen from './Screens/PatientScreens/AIInfoScreen';
import SidebarContent from './Components/Doctor Components/Dashboard Components/SidebarContent';
import MobileNav from './Components/Doctor Components/Dashboard Components/MobileNav';
import OverviewScreen from './Screens/DoctorScreens/OverviewScreen';
import PatientAppointmentsScreen from './Screens/PatientScreens/PatientAppointmentsScreen';
import SymptomCheckerScreen from './Screens/PatientScreens/SymptomCheckerScreen';
function App() {
  const { doctorInfo } = useSelector(store => store.doctorLogin);
  return (
    <BrowserRouter>
      {doctorInfo ? (
        <>
          <SidebarContent /> <MobileNav />
        </>
      ) : (
        <Navbar />
      )}

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
          <Route path="/docAppointment" element={<DoctorAppointmentScreen />} />
          <Route path="/videoCall" element={<VideoCallScreen />} />
          <Route path="/modelInfo" element={<AIInfoScreen />} />
          <Route path="/symptomChecker" element={<SymptomCheckerScreen />} />
          <Route
            path="/upcommingAppointments"
            element={<PatientAppointmentsScreen />}
          />
          <Route
            path="/appointmentSuccess"
            element={<AppointmentSuccessScreen />}
          />
          <Route
            path="/pneumoniaDetection"
            element={<PneumoniaDetectionScreen />}
          />
          <Route
            path="/pneumoniaDetection/report"
            element={<ReportGenerationScreen />}
          />
          <Route path="/chat" element={<ChatScreen />} />
          <Route path="/overview" element={<OverviewScreen />} />
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
