import { useState } from 'react';
import {
  useFetchProductsQuery,
  useAddProductMutation,
  useRemoveProductMutation,
} from '../../redux/products/slice';
export default function HomePage() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [size, setSize] = useState('');

  console.log(useFetchProductsQuery());
  const { data, isFetching } = useFetchProductsQuery();
  const [addProduct, { isLoading }] = useAddProductMutation();
  const [removeProduct, { isLoading: isDelete }] = useRemoveProductMutation();

  const handleChange = e => {
    switch (e.target.name) {
      case 'title':
        setTitle(e.target.value);
        break;
      case 'desc':
        setDesc(e.target.value);
        break;
      case 'size':
        setSize(e.target.value);
        break;
      default:
        alert(`Check the input name`);
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    const product = {
      title,
      desc,
      size,
    };
    addProduct(product);
    reset();
  };
  const reset = () => {
    setTitle('');
    setDesc('');
    setSize('');
  };
  // console.log(removeProduct);
  const handleDelete = e => {
    removeProduct(e.target.id);
  };
  return (
    <>
      <h1>Home</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          placeholder="title"
          onChange={handleChange}
        />
        <input
          type="text"
          name="desc"
          value={desc}
          placeholder="desc"
          onChange={handleChange}
        />
        <input
          type="text"
          name="size"
          value={size}
          placeholder="size"
          onChange={handleChange}
        />
        <button type="submit">add</button>
      </form>
      {isLoading && <h1>...load</h1>}
      <ul>
        {data &&
          data.map(el => {
            return (
              <li key={el.id}>
                <p>
                  {el.id}-{el.title}
                </p>
                <button id={el.id} type="button" onClick={handleDelete}>
                  delete
                </button>
              </li>
            );
          })}
      </ul>
    </>
  );
}
