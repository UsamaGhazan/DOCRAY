import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { loginDoc } from './doctorLoginSlice';
export const registerDoc = createAsyncThunk(
  'registerDoctor',
  async (
    {
      name,
      email,
      password,
      gender,
      specialization,
      degree,
      charges,
      category,
      experience,
      areaname,
      clinicname,
      image,
    },
    thunkAPI
  ) => {
    try {
      console.log(category);
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        `/api/doctors`,
        {
          name,
          email,
          password,
          gender,
          specialization,
          degree,
          charges,
          category,
          experience,
          areaname,
          clinicname,
          image,
        },
        config
      );
      // loggingin user as he is registered
      thunkAPI.dispatch(loginDoc({ email, password }));
      // Setting User data to local storage which we are getting from backend
      localStorage.setItem('doctorInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      const newError =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkAPI.rejectWithValue(newError);
    }
  }
);

const initialState = {};

export const registerDoctorSlice = createSlice({
  name: 'registerDoctor',
  initialState,
  extraReducers: {
    [registerDoc.pending]: state => {
      return {
        loading: true,
      };
    },

    [registerDoc.fulfilled]: (state, action) => {
      return {
        loading: false,
        doctorInfo: action.payload,
      };
    },

    [registerDoc.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export default registerDoctorSlice.reducer;
