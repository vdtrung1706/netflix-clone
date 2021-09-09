import { useEffect, useRef, useState } from 'react';
import useViewport from './useViewport';

const useDetailModal = (open, anchorRect, translateX) => {
  const [size, setSize] = useState({
    height: anchorRect.height,
    width: anchorRect.width,
  });
  const [position, setPosition] = useState({
    top: anchorRect.top,
    left: anchorRect.left,
    right: anchorRect.right,
  });
  const transform = useRef(`translate(${translateX}, -66.666667%)`);
  const { width: windowWidth } = useViewport();

  useEffect(() => {
    if (!open) return;

    transform.current = `translateX(${(windowWidth - size.width) / 2}px)`;
    setSize((pre) => ({ ...pre, height: '95%' }));
    setPosition((pre) => ({ ...pre, top: 0, left: 0, right: 0 }));

    if (windowWidth < 570) {
      setSize((pre) => ({ ...pre, width: '96%' }));
    } else if (windowWidth < 1024) {
      setSize((pre) => ({ ...pre, width: 560 }));
    } else {
      setSize((pre) => ({ ...pre, width: 850 }));
    }
  }, [open, size.width, windowWidth]);

  return {
    size,
    position,
    transform: transform.current,
  };
};

export default useDetailModal;
