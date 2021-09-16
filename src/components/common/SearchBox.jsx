import { CROSS_SIGN, SEARCH_ICON } from '@assets';
import useOutside from '@hooks/useOutside';
import { SEARCH_ENDPOINT } from '@services/requests.service';
import { selectSearch } from '@store/search/selectors.search';
import { fetchSearchResults, searchActions } from '@store/search/slice.search';
import cx from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

export default function SearchBox() {
  const ref = useRef(null);
  const inputRef = useRef(null);
  const preLocation = useRef(null);
  const [toggle, setToggle] = useState(false);
  const { searchContent } = useSelector(selectSearch);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname != '/search') {
      preLocation.current = location.pathname;
    }
  }, [location.pathname]);

  useEffect(() => {
    if (toggle && inputRef.current) {
      inputRef.current.focus();
    }
  }, [toggle]);

  useOutside(ref, () => {
    if (!searchContent) setToggle(false);
  });

  const handleToggle = () => {
    if (!searchContent) {
      setToggle(!toggle);
    }
  };

  const handleRemoveSearchContent = useCallback(() => {
    dispatch(searchActions.removeSearchContent());
    history.push(preLocation.current);
  }, [dispatch, history]);

  const handleChangeSearchContent = useCallback(
    (e) => {
      const value = e.target.value;
      dispatch(searchActions.changeSearchContent(value));
      if (value) {
        dispatch(fetchSearchResults(SEARCH_ENDPOINT + value.toLowerCase()));
        history.push(`/search?q=${value}`);
      } else {
        history.push(preLocation.current);
      }
    },
    [dispatch, history],
  );

  return (
    <div
      ref={ref}
      className={cx('flex items-center bg-opacity-90', {
        'bg-black border-white border border-solid': toggle,
      })}
    >
      <button
        onClick={handleToggle}
        className="w-4 h-4 px-1 lg:h-5 lg:w-5 lg:px-2"
      >
        <img src={SEARCH_ICON} alt="search" />
      </button>

      <input
        ref={inputRef}
        value={searchContent}
        onChange={(e) => handleChangeSearchContent(e)}
        className={cx(
          `outline-none w-0 text-xs lg:text-sm bg-transparent transition-width duration-300 ease-linear`,
          { 'w-36 p-1 mr-1 lg:w-48 lg:p-2 lg:mr-2': toggle },
        )}
        placeholder="Title, people, genres"
      />

      <button
        onClick={() => handleRemoveSearchContent()}
        className={cx('h-0 w-0 px-0 lg:h-0 lg:w-0 cursor-default', {
          'h-3 w-3 px-2 lg:h-4 lg:w-3': toggle,
        })}
      >
        <img
          className={cx('transition-opacity ease-linear duration-200', {
            'opacity-100 cursor-pointer': searchContent,
            'hidden opacity-0': !searchContent,
          })}
          src={CROSS_SIGN}
          alt="clear"
        />
      </button>
    </div>
  );
}
