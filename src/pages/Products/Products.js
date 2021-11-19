import { useMemo, useState, useCallback } from 'react';

import ProductList from '../../components/Products/ProductList';
import { Modal } from '../../components/Modal/Modal';
import Form from '../../components/Forms/Form';

import { useToggle } from '../../hooks/useToggle';
// import { useLS } from '../../hooks/useLS';
import { getFilter } from '../../redux/products/selectors';
// ====== REDUX ========== //
import { useDispatch, useSelector } from 'react-redux';
import { filterValue } from '../../redux/products/actions';

export default function ProductsPage() {
  const [showModal, setShowModal] = useToggle(false);

  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const handleChangeFilter = e => dispatch(filterValue(e.currentTarget.value));

  return (
    <>
      {showModal && (
        <Modal toggleModal={setShowModal}>
          <Form />
        </Modal>
      )}
      <h1>FE-35 Product</h1>
      <button type="button" onClick={setShowModal}>
        Add Product
      </button>
      <br />
      <label htmlFor="filter">Filter</label>
      <br />
      <input
        type="text"
        id="filter"
        value={filter}
        onChange={handleChangeFilter}
      />
      <br />
      <ProductList />
    </>
  );
}
