import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const bookPatient = createAsyncThunk(
  'bookPatient',
  async ({ startTime, date, doctorID }, thunkAPI) => {
    console.log(startTime, date, doctorID);
    const {
      patientLogin: { patientInfo },
    } = thunkAPI.getState();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${patientInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/patients/bookAppointment`,
        { startTime, date, doctorID },
        config
      );
      console.log(data);
      return data;
    } catch (error) {
      const newError =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      //This will end up in rejected section as payload... just error return karny sy fulfilled action run hora tha
      return thunkAPI.rejectWithValue(newError);
    }
  }
);

const initialState = {
  success: false,
};

const bookPatientApptSlice = createSlice({
  name: 'bookPatient',
  initialState,
  reducers: {
    BOOK_PATIENT_RESET: () => {
      return {};
    },
  },
  extraReducers: {
    [bookPatient.pending]: () => {
      return {
        loading: true,
      };
    },
    [bookPatient.fulfilled]: () => {
      return {
        loading: false,
        success: true,
      };
    },
    [bookPatient.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export const { BOOK_PATIENT_RESET } = bookPatientApptSlice.actions;
export default bookPatientApptSlice.reducer;
