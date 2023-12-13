/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import LoadingModel from '../../Models/LoadingModel';

const initialState: LoadingModel = {
  isLoading: false,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    loadingOn(state: LoadingModel) {
      state.isLoading = true;
    },
    loadingOff(state: LoadingModel) {
      state.isLoading = false;
    },
  },
});

export const {loadingOn, loadingOff} = loadingSlice.actions;

export default loadingSlice.reducer;
