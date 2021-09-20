import { useEffect } from 'react';

const useVisibility = (ref, callbackOn = () => {}, callbackOff = () => {}) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.5) {
          if (ref.current) callbackOff();
        } else {
          callbackOn();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: [0, 0.5],
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    } else {
      observer.disconnect();
    }
  }, [callbackOff, callbackOn, ref]);
};

export default useVisibility;
