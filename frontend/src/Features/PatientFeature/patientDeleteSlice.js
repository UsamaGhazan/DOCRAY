import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {};

export const deletePatient = createAsyncThunk(
  'PatientDelete',
  async (id, thunkAPI) => {
    console.log('handleDeleteSlice');

    try {
      const {
        adminLogin: { adminInfo },
      } = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`,
        },
      };
      await axios.delete(`/api/patients/${id}`, config);
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

const patientDeleteSlice = createSlice({
  name: 'patientDelete',
  initialState,
  extraReducers: {
    [deletePatient.pending]: state => {
      return {
        loading: true,
      };
    },

    [deletePatient.fulfilled]: (state, action) => {
      return {
        loading: false,
        success: true,
      };
    },

    [deletePatient.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});

export default patientDeleteSlice.reducer;
