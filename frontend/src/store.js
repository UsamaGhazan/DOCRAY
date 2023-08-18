import { configureStore } from '@reduxjs/toolkit';
import doctorListReducer from './Features/DoctorFeature/doctorListSlice';
import doctorDetailReducer from './Features/DoctorFeature/doctorDetailSlice';
import loginPatientReducer from './Features/PatientFeature/loginPatientSlice';
import registerPatientReducer from './Features/PatientFeature/registerPatientSlice';
import doctorReviewReducer from './Features/DoctorFeature/doctorReviewSlice';
import bookPatientApptReducer from './Features/PatientFeature/bookPatientApptSlice';
import registerDoctorReducer from './Features/DoctorFeature/registerDoctorSlice';
import doctorLoginReducer from './Features/DoctorFeature/doctorLoginSlice';
import appointmentDetailReducer from './Features/DoctorFeature/appointmentDetailSlice';
import setAvailabilityReducer from './Features/DoctorFeature/setAvailabilitySlice';
import getAvailabilityReducer from './Features/DoctorFeature/getAvailabilitySlice';
import uploadImageReducer from './Features/uploadImageSlice';
const patientInfoFromStorage = localStorage.getItem('patientInfo')
  ? JSON.parse(localStorage.getItem('patientInfo'))
  : null;

const doctorInfoFromStorage = localStorage.getItem('doctorInfo')
  ? JSON.parse(localStorage.getItem('doctorInfo'))
  : null;
const initialState = {
  patientLogin: {
    patientInfo: patientInfoFromStorage,
  },
  doctorLogin: {
    doctorInfo: doctorInfoFromStorage,
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
    appointmentDetails: appointmentDetailReducer,
    doctorSetSlots: setAvailabilityReducer,
    doctorAvailableSlots: getAvailabilityReducer,
    uploadImage: uploadImageReducer,
  },
  preloadedState: initialState,
});
