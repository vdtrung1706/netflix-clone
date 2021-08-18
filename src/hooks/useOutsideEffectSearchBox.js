import { useEffect } from 'react';

export default function useOutsideEffectSearchBox(ref, txt, setToggle) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (!txt) {
          setToggle(false);
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, txt, setToggle]);
}
