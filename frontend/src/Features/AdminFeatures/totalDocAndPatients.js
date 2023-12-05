import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTotalDocAndPatients = createAsyncThunk(
  'GetTotalDocAndPat',
  async (patientId, thunkAPI) => {
    console.log(patientId);
    try {
      const { data } = await axios.get(`/api/admin/totalDocAndPat`);
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

const initialState = {
  loading: true,
};

const totalDocAndPatSlice = createSlice({
  name: 'GetTotalDocAndPat',

  initialState,

  extraReducers: {
    [getTotalDocAndPatients.pending]: state => {
      return {
        loading: true,
      };
    },
    [getTotalDocAndPatients.fulfilled]: (state, action) => {
      return {
        loading: false,
        noOfDocandPat: action.payload,
      };
    },
    [getTotalDocAndPatients.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export default totalDocAndPatSlice.reducer;
