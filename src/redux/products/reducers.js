import { createReducer } from '@reduxjs/toolkit';
import { addProduct, deleteProduct, filterValue } from './actions';
const initState = [
  { id: '1', title: 'product-1' },
  { id: '2', title: 'product-2' },
  { id: '3', title: 'product-3' },
];

export const productsList = createReducer(initState, {
  [addProduct]: (state, { payload }) => [...state, payload],
  'product/delete': (state, { payload }) =>
    state.filter(product => product.id !== payload),
});
export const productFilter = createReducer('', {
  'filter/value': (_, { payload }) => payload,
});
// const productsList = (state = initState, action) => {
//   switch (action.type) {
//     case 'product/add':
//       return [...state, action.payload];
//     case 'product/delete':
//       return state.filter(product => product.id !== action.payload.id);
//     default:
//       return state;
//   }
// };

// const productFilter = (state = '', { payload }) => {
//   return payload;
// };
