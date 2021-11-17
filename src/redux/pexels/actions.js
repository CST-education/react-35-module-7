import { createAction } from '@reduxjs/toolkit';

// pending
export const getImagesRequest = createAction('getImages/request');
// resolved
export const getImagesSuccess = createAction('getImages/success');
// rejected
export const getImagesError = createAction('getImages/error');
