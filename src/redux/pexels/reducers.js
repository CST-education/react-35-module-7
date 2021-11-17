import { createReducer } from '@reduxjs/toolkit';
// import { getImagesRequest, getImagesSuccess, getImagesError } from './actions';
import { getThunkData, getMoreThunkData } from './operations';

// console.dir(getThunkData);

// Так работаем с классическими операциями и 3я экшенами
// export const images = createReducer([], {
//   [getImagesSuccess]: (state, action) => {
//     return [...state, ...action.payload];
//   },
// });
// export const loading = createReducer(false, {
//   [getImagesRequest]: (_, action) => true,
//   [getImagesSuccess]: (_, action) => false,
//   [getImagesError]: (_, action) => false,
// });

// export const error = createReducer(null, {
//   [getImagesError]: (_, action) => action.payload,
// });

// так с AsyncThunk без использования трех экшенов
export const images = createReducer([], {
  // записывам данные, если они пришли, иначе это другой редуктор - error
  [getThunkData.fulfilled]: (_, action) => {
    console.log('images reducer', action.payload);
    return [...action.payload];
  },
  [getMoreThunkData.fulfilled]: (state, action) => {
    console.log('images reducer', action.payload);
    return [...state, ...action.payload];
  },
});
export const loading = createReducer(false, {
  // пока идет запрос, ставим true
  [getThunkData.pending]: (_, action) => true,
  // когда пришел ответ, не важно, успех или ошибка, ставим false
  [getThunkData.fulfilled]: (_, action) => false,
  [getThunkData.rejected]: (_, action) => false,
});

export const error = createReducer(null, {
  // если пришел массив с данными, то чистим ошибку
  [getThunkData.fulfilled]: (_, action) => null,
  // если пришла ошибка, записываем ее в редакс
  [getThunkData.rejected]: (_, action) => {
    console.log(action.payload);
    return action.payload;
  },
});
