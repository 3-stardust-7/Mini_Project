import { configureStore } from '@reduxjs/toolkit';
import patientReducer from './PatientSlice';

export const store = configureStore({
  reducer: {
    patient: patientReducer,
  },
});