import { createSlice } from '@reduxjs/toolkit';
import { getThunkData } from './operations';

const pexelSlice = createSlice({
  name: 'pexels',
  initialState: {
    images: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [getThunkData.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    [getThunkData.fulfilled]: (state, action) => {
      return {
        ...state,
        images: [...state.images, ...action.payload],
        loading: false,
      };
    },
    [getThunkData.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
});
export default pexelSlice.reducer;
