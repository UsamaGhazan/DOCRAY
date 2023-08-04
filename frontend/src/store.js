import { configureStore } from '@reduxjs/toolkit';
import doctorListReducer from './Features/DoctorFeature/doctorListSlice';
import doctorDetailReducer from './Features/DoctorFeature/doctorDetailSlice';
import loginPatientReducer from './Features/PatientFeature/loginPatientSlice';
import registerPatientReducer from './Features/PatientFeature/registerPatientSlice';
import doctorReviewReducer from './Features/DoctorFeature/doctorReviewSlice';
import bookPatientApptReducer from './Features/PatientFeature/bookPatientApptSlice';
import registerDoctorReducer from './Features/DoctorFeature/registerDoctorSlice';
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
  // doctorLogin: {
  //   doctorInfo: doctorInfoFromStorage,
  // },
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
  },
  preloadedState: initialState,
});
