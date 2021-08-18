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
      <button onClick={handleToggle} className={`h-5 w-5 px-2`}>
        <img src={searchIconUrl} alt="Search" />
      </button>

      <input
        value={txt}
        onChange={e => setTxt(e.target.value)}
        className={cx(
          `w-0 bg-transparent outline-none transition-width duration-300 ease-linear`,
          { 'w-48 p-2 mr-3': toggle }
        )}
        placeholder="Title, people, genres"
      />

      <button
        onClick={() => setTxt('')}
        className={cx('h-0 w-0 px-0', { 'h-4 w-4 px-2': toggle })}
      >
        <img
          className={`${txt ? '' : 'hidden'}`}
          src={crossSign}
          alt="Delete"
        />
      </button>
    </div>
  );
};

export default SearchBox;
