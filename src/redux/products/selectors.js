import { createSelector } from '@reduxjs/toolkit'; // reselect

export const getProducts = state => state.products.products;
//                       { products: []} =>  []
export const getFilter = state => state.products.filter;
//                   { filter:"filterValue"} =>  filterValue

export const getFilteredProducts = createSelector(
  [getProducts, getFilter],
  (productsArray, filterValue) => {
      let normFilter = filterValue.toLowerCase()
      return productsArray.filter((productObject)=>{
          return productObject.title.toLowerCase().includes(normFilter)
      })
  },
);
