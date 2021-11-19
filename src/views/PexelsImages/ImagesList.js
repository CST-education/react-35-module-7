import { useState, useEffect } from 'react';
import { PexelsFetchObject } from '../../services/pexels';
import { useLS } from '../../hooks/useLS';
import { Loader } from '../../components/Loader/Loader';
import { LoadMoreBtn } from '../../components/Button/Button';
import s from './ImagesList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { pexelsOperation, pexelsSelectors } from '../../redux/pexels';
console.log(pexelsOperation, pexelsSelectors);
// == импорты для перехода на страницу карточки

const newPexelsFetchObject = new PexelsFetchObject();

export function ImagesList({ searchValue, perPage }) {
  const searchResults = useSelector(pexelsSelectors.getImages);
  const [searchValueLS, setSearchValueLS] = useLS('searchValue', '');
  const [searchPageLS, setSearchPageLS] = useLS('searchPage', '');
  // const [status, setStatus] = useState('init');

  const dispatch = useDispatch();

  useEffect(() => {
    if (!searchValue.trim()) return;
    setSearchValueLS(searchValue);
    setSearchPageLS(1);
    // newPexelsFetchObject.resetPage();
    console.log('searchValue', searchValue);
    // newPexelsFetchObject.searchQuery = searchValue;
    // newPexelsFetchObject.perPage = perPage;
    dispatch(pexelsOperation.getThunkData({ searchValue, perPage }));
  }, [dispatch, searchValue, perPage, setSearchPageLS, setSearchValueLS]);

  const handleClick = () => {
    if (!searchValue && searchValueLS) {
      // newPexelsFetchObject.searchQuery = searchValueLS;
      setSearchPageLS(searchPageLS + 1);
      newPexelsFetchObject.page = searchPageLS + 1;
      dispatch(pexelsOperation.getMoreThunkData(searchValueLS));
    } else {
      newPexelsFetchObject.page = 1;
      dispatch(pexelsOperation.getMoreThunkData());
    }
  };
  console.log('imagesList', searchResults);
  return (
    <>
      <ul className={s.imagesList}>
        {searchResults?.length ? (
          searchResults.map(el => (
            <li key={el.id}>
              <img src={el.src.tiny} alt={el.photographer} />
            </li>
          ))
        ) : (
          <p>Nothing to render</p>
        )}
      </ul>
      <LoadMoreBtn btnType="button" handleClick={handleClick} />
    </>
  );
}
