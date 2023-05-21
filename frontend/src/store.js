import { configureStore } from '@reduxjs/toolkit';
import doctorListReducer from './Features/DoctorFeature/doctorListSlice';
export const store = configureStore({
  reducer: {
    doctorList: doctorListReducer,
  },
});
