import { useEffect, useRef, useState } from 'react';

const useHover = (defaultValue = false) => {
  const [value, setValue] = useState(defaultValue);
  const ref = useRef(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener('mouseenter', handleMouseOver);
        node.addEventListener('mouseleave', handleMouseOut);
        return () => {
          node.removeEventListener('mouseenter', handleMouseOver);
          node.removeEventListener('mouseleave', handleMouseOut);
        };
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref.current]
  );
  return [ref, value];
};

export default useHover;
