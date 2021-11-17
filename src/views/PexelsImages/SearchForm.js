import { useState } from 'react';

export function SearchFrom({ getSearchValues }) {
  const [searchValue, setSearchValue] = useState('');
  const [perPage, setPerPage] = useState(5);

  const handleSearchChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'searchValue':
        setSearchValue(value);
        break;
      case 'perPage':
        setPerPage(value);
        break;
      default:
    }
  };
  const handleSearchSubmit = e => {
    e.preventDefault();
    console.log('BEFORE FETCH', searchValue, perPage);
    getSearchValues(searchValue, perPage);
    setSearchValue('');
    // setPerPage(2);
  };
  return (
    <form onSubmit={handleSearchSubmit}>
      <input
        type="text"
        name="searchValue"
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="Value"
      />
      <input
        type="number"
        name="perPage"
        value={perPage}
        onChange={handleSearchChange}
        placeholder="how many results?"
      />
      <button type="submit">search</button>
    </form>
  );
}
