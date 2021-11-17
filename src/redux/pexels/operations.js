import { createAsyncThunk } from '@reduxjs/toolkit';

import { getImagesRequest, getImagesSuccess, getImagesError } from './actions';
import { PexelsFetchObject } from '../../services/pexels';
const newPexelsFetchObject = new PexelsFetchObject();

export const getData = searchValue => dispatch => {
  dispatch(getImagesRequest());
  newPexelsFetchObject.searchQuery = searchValue;
  newPexelsFetchObject
    .searchPhotos()
    .then(r => {
      dispatch(getImagesSuccess(r));
    })
    .catch(err => {
      dispatch(getImagesError(err));
    });
};

export const getThunkData = createAsyncThunk(
  'getImages',
  async ({ searchValue, perPage }, { rejectWithValue }) => {
    newPexelsFetchObject.searchQuery = searchValue;
    newPexelsFetchObject.perPage = perPage;
    newPexelsFetchObject.resetPage();
    try {
      const data = await newPexelsFetchObject.searchPhotos();
      if (data.length > 0) {
        return data;
      } else {
        throw new Error('Empty Array by this request');
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const getMoreThunkData = createAsyncThunk(
  'getMoreImages',
  async (_, { rejectWithValue }) => {
    try {
      const data = await newPexelsFetchObject.searchPhotos();
      if (data.length > 0) {
        return data;
      } else {
        throw new Error('Empty Array by this request');
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
