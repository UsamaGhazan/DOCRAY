import { configureStore } from '@reduxjs/toolkit';
import doctorListReducer from './Features/DoctorFeature/doctorListSlice';
import doctorDetailReducer from './Features/DoctorFeature/doctorDetailSlice';
import loginPatientReducer from './Features/PatientFeature/loginPatientSlice';

const patientInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('patientInfo'))
  : null;

const initialState = {
  patientLogin: {
    patientInfo: patientInfoFromStorage,
  },
};

export const store = configureStore({
  reducer: {
    doctorList: doctorListReducer,
    doctorDetails: doctorDetailReducer,
    patientLogin: loginPatientReducer,
  },
  preloadedState: initialState,
});
