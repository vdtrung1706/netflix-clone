import { useEffect } from 'react';

function useOutsideEffectSearchBox(ref, txt, setToggle) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target) && !txt) {
        setToggle(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, txt, setToggle]);
}

export default useOutsideEffectSearchBox;
