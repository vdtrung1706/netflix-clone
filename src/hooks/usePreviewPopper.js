import { defaultEasing } from '@utils/motion.utils';
import { useMemo } from 'react';
import useViewport from './useViewport';

const usePreviewPopper = (transformOrigin, anchorEl) => {
  const { width } = useViewport();

  const translateX = useMemo(() => {
    if (transformOrigin === 'right') {
      return `-${width * 0.04 - 4}px`;
    } else if (transformOrigin === 'left') {
      return `${width * 0.04 - 4}px`;
    }
    return 0;
  }, [transformOrigin, width]);

  const anchorRect = anchorEl.getBoundingClientRect();

  const previewVariants = useMemo(
    () => ({
      initial: {
        opacity: 1,
        transformOrigin,
        scale: (anchorRect.width - 4) / 350,
        translateX,
        translateY: '-52%',
      },
      animate: {
        opacity: 1,
        transformOrigin,
        scale: 1,
        translateX,
        translateY: '-66.666667%',
        transition: { duration: 0.4, ease: defaultEasing },
      },
      exit: {
        opacity: 0,
        transformOrigin,
        scale: (anchorRect.width - 4) / 350,
        translateX,
        translateY: '-52%',
        transition: { duration: 0.35, ease: defaultEasing },
      },
    }),
    [anchorRect.width, transformOrigin, translateX],
  );

  return {
    previewVariants,
    translateX,
  };
};

export default usePreviewPopper;
