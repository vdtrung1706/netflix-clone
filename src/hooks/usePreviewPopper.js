import { getBoundingClientRect } from '@utils/convertor.utils';
import { defaultEasing } from '@utils/motion.utils';
import { useMemo } from 'react';
import useViewport from './useViewport';

const usePreviewPopper = (transformOrigin, anchorEl) => {
  const { width } = useViewport();

  const { translateX, popperOffset } = useMemo(() => {
    let transX = 0;
    let offset = [0, 0];

    if (transformOrigin === 'right') {
      transX = `-${width * 0.04}px`;
      offset = [Number.MAX_SAFE_INTEGER, 0];
    } else if (transformOrigin === 'left') {
      transX = `${width * 0.04}px`;
      offset = [Number.MIN_SAFE_INTEGER, 0];
    }

    return { translateX: transX, popperOffset: offset };
  }, [transformOrigin, width]);

  const anchorRect = getBoundingClientRect(anchorEl);

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
    popperOffset,
  };
};

export default usePreviewPopper;
