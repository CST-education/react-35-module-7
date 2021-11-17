import { useState } from 'react';

import { SearchFrom } from '../../views/PexelsImages/SearchForm';
import { ImagesList } from '../../views/PexelsImages/ImagesList';

export default function PexelsPage({ title }) {
  const [searchValue, setSearchValue] = useState('');
  const [perPage, setPerPage] = useState(5);
  const getSearchValues = (searchValue, perPage) => {
    setSearchValue(searchValue);
    setPerPage(perPage);
  };
  return (
    <>
      <h1>{title}</h1>
      <SearchFrom getSearchValues={getSearchValues} />
      <ImagesList searchValue={searchValue} perPage={perPage} />
    </>
  );
}
