import { configureStore } from '@reduxjs/toolkit';
import doctorListReducer from './Features/DoctorFeature/doctorListSlice';
import doctorDetailReducer from './Features/DoctorFeature/doctorDetailSlice';
import loginPatientReducer from './Features/PatientFeature/loginPatientSlice';
import registerPatientReducer from './Features/PatientFeature/registerPatientSlice';
import doctorReviewReducer from './Features/DoctorFeature/doctorReviewSlice';
import bookPatientApptReducer from './Features/PatientFeature/bookPatientApptSlice';
import registerDoctorReducer from './Features/DoctorFeature/registerDoctorSlice';
import doctorLoginReducer from './Features/DoctorFeature/doctorLoginSlice';
import appointmentListReducer from './Features/DoctorFeature/appointmentListSlice';
import setAvailabilityReducer from './Features/DoctorFeature/setAvailabilitySlice';
import getAvailabilityReducer from './Features/DoctorFeature/getAvailabilitySlice';
import uploadImageReducer from './Features/uploadImageSlice';
import CancelAppointmentReducer from './Features/DoctorFeature/CancelAppointmentSlice';
import pneumoniaDetectionReducer from './Features/PatientFeature/pneumoniaDetectionSlice';
import tbDetectionReducer from './Features/PatientFeature/tbDetectionSlice';
import appointmentDetailsReducer from './Features/appointmentDetailsSlice';
import upcommingAppointmentReducer from './Features/PatientFeature/upcommingAppointmentSlice';
import adminLoginReducer from './Features/AdminFeatures/adminLoginSlice';
import doctorDeleteReducer from './Features/DoctorFeature/doctorDeleteSlice';
import patientListReducer from './Features/PatientFeature/patientListSlice';
import patientDeleteReducer from './Features/PatientFeature/patientDeleteSlice';
import getAllAppointmentsReducer from './Features/AdminFeatures/getAllAppointmentsSlice';
import totalDocAndPatReducer from './Features/AdminFeatures/totalDocAndPatients';
const patientInfoFromStorage = localStorage.getItem('patientInfo')
  ? JSON.parse(localStorage.getItem('patientInfo'))
  : null;

const doctorInfoFromStorage = localStorage.getItem('doctorInfo')
  ? JSON.parse(localStorage.getItem('doctorInfo'))
  : null;
const adminInfoFromStorage = localStorage.getItem('adminInfo')
  ? JSON.parse(localStorage.getItem('adminInfo'))
  : null;
const initialState = {
  patientLogin: {
    patientInfo: patientInfoFromStorage,
  },
  doctorLogin: {
    doctorInfo: doctorInfoFromStorage,
  },
  adminLogin: {
    adminInfo: adminInfoFromStorage,
  },
};

export const store = configureStore({
  reducer: {
    doctorList: doctorListReducer,
    doctorDetails: doctorDetailReducer,
    patientLogin: loginPatientReducer,
    patientRegister: registerPatientReducer,
    doctorReview: doctorReviewReducer,
    patientAppt: bookPatientApptReducer,
    doctorRegister: registerDoctorReducer,
    doctorLogin: doctorLoginReducer,
    doctorDelete: doctorDeleteReducer,
    appointmentList: appointmentListReducer,
    doctorSetSlots: setAvailabilityReducer,
    doctorAvailableSlots: getAvailabilityReducer,
    uploadImage: uploadImageReducer,
    cancelAppointment: CancelAppointmentReducer,
    pneumoniaDetection: pneumoniaDetectionReducer,
    tbDetection: tbDetectionReducer,
    appointmentDetails: appointmentDetailsReducer,
    upcommingAppointments: upcommingAppointmentReducer,
    adminLogin: adminLoginReducer,
    patientList: patientListReducer,
    patientDelete: patientDeleteReducer,
    allAppointments: getAllAppointmentsReducer,
    totalDocAndPat: totalDocAndPatReducer,
  },
  preloadedState: initialState,
});
