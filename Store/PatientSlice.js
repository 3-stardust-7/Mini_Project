import { createSlice } from '@reduxjs/toolkit';

const PatientSlice = createSlice({
  name: 'patient',
  initialState: {
    selectedPatient: null,
  },
  reducers: {
    setSelectedPatient: (state, action) => {
      state.selectedPatient = action.payload;
    },
    clearSelectedPatient: (state) => {
      state.selectedPatient = null;
    },
  },
});

export const { setSelectedPatient, clearSelectedPatient } = PatientSlice.actions;
export default PatientSlice.reducer;