// import { createStore } from 'redux';

// import { composeWithDevTools } from 'redux-devtools-extension';
// export const store = createStore(productReducer, composeWithDevTools());

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { productsList, productFilter } from './products/reducers';
// import { images, loading, error } from './pexels/reducers';
// import logger from 'redux-logger';
import pexelSlice from './pexels/slices';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
console.dir('pexelSlice', pexelSlice);

const persistProdConfig = {
  key: 'products',
  version: 1,
  storage,
  blacklist: ['filter'],
};

const productReducer = combineReducers({
  products: productsList,
  filter: productFilter,
});
const persistedProductReducer = persistReducer(
  persistProdConfig,
  productReducer,
);

// const pexelsImages = combineReducers({
//   images,
//   loading,
//   error,
// });

const persistImagesConfig = {
  key: 'images',
  version: 1,
  storage,
  blacklist: ['loading', 'error'],
};

const persistedImagesReducer = persistReducer(
  persistImagesConfig,
  pexelSlice,
  // pexelsImages,
);

export const store = configureStore({
  reducer: {
    products: persistedProductReducer,
    pexels: persistedImagesReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
