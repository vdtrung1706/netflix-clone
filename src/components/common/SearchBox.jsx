import { CROSS_SIGN, SEARCH_ICON } from '@assets';
import useOutside from '@hooks/useOutside';
import cx from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export default function SearchBox() {
  const ref = useRef(null);
  const inputRef = useRef(null);
  const preLocation = useRef(null);
  const [toggle, setToggle] = useState(false);
  const [query, setQuery] = useState('');

  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    if (location.pathname != '/search') {
      preLocation.current = pathname;
    }
  }, [pathname]);

  useEffect(() => {
    if (toggle && inputRef.current) {
      inputRef.current.focus();
    }
  }, [toggle]);

  useOutside(ref, () => {
    if (!query) setToggle(false);
  });

  const handleToggle = () => {
    if (!query) {
      setToggle((pre) => !pre);
    }
  };

  const handleRemoveSearchContent = useCallback(() => {
    setQuery('');
    history.replace(preLocation.current);
  }, [history]);

  const handleChangeSearchContent = useCallback(
    (e) => {
      const value = e.target.value;
      setQuery(value);
      if (value) {
        history.replace(`/search?query=${value}`);
      } else {
        history.replace(preLocation.current);
      }
    },
    [history],
  );

  const handleKeydown = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        history.replace(`/search?query=${query}`);
      }
    },
    [history, query],
  );

  return (
    <div
      ref={ref}
      role="searchbox"
      tabIndex="-1"
      onKeyDown={(event) => handleKeydown(event)}
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
        value={query}
        onChange={(e) => handleChangeSearchContent(e)}
        className={cx(
          `outline-none w-0 text-xs lg:text-sm bg-transparent transition-all duration-300 ease-linear`,
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
            'opacity-100 cursor-pointer': query,
            'hidden opacity-0': !query,
          })}
          src={CROSS_SIGN}
          alt="clear"
        />
      </button>
    </div>
  );
}
