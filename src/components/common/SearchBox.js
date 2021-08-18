// import { useState } from "react"
import searchIconUrl from '../../assets/icons/search-icon.svg';
import crossSign from '../../assets/icons/cross-sign.svg';
import { useState, useRef } from 'react';
import useOutsideEffectSearchBox from '../../hooks/useOutsideEffectSearchBox';
import cx from 'classnames';

const SearchBox = () => {
  const ref = useRef(null);
  const [txt, setTxt] = useState('');
  const [toggle, setToggle] = useState(false);

  useOutsideEffectSearchBox(ref, txt, setToggle);

  const handleToggle = () => {
    if (!txt) {
      setToggle(!toggle);
    }
  };

  return (
    <div
      ref={ref}
      className={cx('flex items-center bg-opacity-90', {
        'bg-black border-white border border-solid': toggle,
      })}
    >
      <button
        onClick={handleToggle}
        className={`h-4 w-4 px-1 lg:h-5 lg:w-5 lg:px-2`}
      >
        <img src={searchIconUrl} alt="Search" />
      </button>

      <input
        value={txt}
        onChange={e => setTxt(e.target.value)}
        className={cx(
          `w-0 text-xs lg:text-sm bg-transparent outline-none transition-width duration-300 ease-linear`,
          { 'w-36 p-1 mr-1 lg:w-48 lg:p-2 lg:mr-2': toggle }
        )}
        placeholder="Title, people, genres"
      />

      <button
        onClick={() => setTxt('')}
        className={cx('h-0 w-0 px-0 lg:h-0 lg:w-0', {
          'h-3 w-3 px-2 lg:h-4 lg:w-3': toggle,
        })}
      >
        <img
          className={cx(
            'opacity-0 transition-opacity ease-linear duration-200',
            {
              'opacity-100': txt,
            }
          )}
          src={crossSign}
          alt="Delete"
        />
      </button>
    </div>
  );
};

export default SearchBox;
