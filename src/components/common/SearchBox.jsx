import useOutside from '@hooks/useOutside';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import cx from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export default function SearchBox() {
  const ref = useRef(null);
  const inputRef = useRef(null);
  const [toggle, setToggle] = useState(false);
  const [query, setQuery] = useState('');

  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/search') return;
    setQuery('');
    setToggle(false);
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
    history.goBack();
  }, [history]);

  const handleChangeSearchContent = useCallback(
    (e) => {
      e.preventDefault();
      const value = e.target.value;
      setQuery((pre) => {
        if (pre.length === 0) {
          history.push(`/search?query=${value}`);
        } else if (pre.length === 1 && value.length === 0) {
          history.goBack();
        } else {
          history.replace(`/search?query=${value}`);
        }
        return value;
      });
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
      className={cx('flex items-center', {
        'bg-black border-white border border-solid bg-opacity-80': toggle,
      })}
    >
      <button onClick={handleToggle} className="px-1 lg:px-2">
        <SearchIcon />
      </button>

      <input
        ref={inputRef}
        value={query}
        placeholder="Title, people, genres"
        onChange={handleChangeSearchContent}
        className={cx(
          `outline-none w-0 text-xs lg:text-sm bg-transparent transition-all duration-300 ease-linear`,
          { 'w-36 p-1 mr-1 lg:w-48 lg:p-2 lg:mr-2': toggle },
        )}
      />

      {toggle && (
        <button
          onClick={handleRemoveSearchContent}
          className="px-1 cursor-default"
        >
          <ClearIcon
            className={cx({
              'opacity-100 cursor-pointer': query,
              'invisible opacity-0': !query,
            })}
          />
        </button>
      )}
    </div>
  );
}
