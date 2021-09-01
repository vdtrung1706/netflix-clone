import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import cx from 'classnames';
import { SEARCH_ENDPOINT } from '../../services/requests';
import useOutside from '../../hooks/useOutside';
import { CROSS_SIGN, SEARCH_ICON } from '../../assets';
import {
  fetchSearchResults,
  searchSlice,
} from '../../redux/devtools/searchSlice';

export default function SearchBox() {
  const ref = useRef(null);
  const preLocation = useRef(null);
  const [toggle, setToggle] = useState(false);
  const { searchContent } = useSelector(state => state.search);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname != '/search') {
      preLocation.current = location.pathname;
    }
  }, [location.pathname]);

  useOutside(ref, () => {
    if (!searchContent) setToggle(false);
  });

  const handleToggle = () => {
    if (!searchContent) {
      setToggle(!toggle);
    }
  };

  const handleRemoveSearchContent = () => {
    dispatch(searchSlice.actions.removeSearchContent());
    history.push(preLocation.current);
  };

  const handleChangeSearchContent = e => {
    const value = e.target.value;
    dispatch(searchSlice.actions.changeSearchContent(value));

    if (value) {
      dispatch(fetchSearchResults(SEARCH_ENDPOINT + value.toLowerCase()));
      history.push(`/search?q=${value}`);
    } else {
      history.push(preLocation.current);
    }
  };

  return (
    <div
      name="searchBox"
      ref={ref}
      className={cx('flex items-center bg-opacity-90', {
        'bg-black border-white border border-solid': toggle,
      })}
    >
      <button
        onClick={handleToggle}
        className={`h-4 w-4 px-1 lg:h-5 lg:w-5 lg:px-2`}
      >
        <img src={SEARCH_ICON} alt="search" />
      </button>

      <input
        value={searchContent}
        onChange={e => handleChangeSearchContent(e)}
        className={cx(
          `w-0 text-xs lg:text-sm bg-transparent outline-none transition-width duration-300 ease-linear`,
          { 'w-36 p-1 mr-1 lg:w-48 lg:p-2 lg:mr-2': toggle }
        )}
        placeholder="Title, people, genres"
      />

      <button
        onClick={() => handleRemoveSearchContent()}
        className={cx('h-0 w-0 px-0 lg:h-0 lg:w-0', {
          'h-3 w-3 px-2 lg:h-4 lg:w-3': toggle,
        })}
      >
        <img
          className={cx(
            'opacity-0 transition-opacity ease-linear duration-200',
            {
              'opacity-100': searchContent,
            }
          )}
          src={CROSS_SIGN}
          alt="remove"
        />
      </button>
    </div>
  );
}
