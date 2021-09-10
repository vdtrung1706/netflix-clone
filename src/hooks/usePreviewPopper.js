import useViewport from './useViewport';
import { defaultEasing } from '@utils/motion.utils';

const usePreviewPopper = (transformOrigin, anchorEl, popperEl) => {
  const { width } = useViewport();

  const getTranslateX = () => {
    if (transformOrigin === 'right') {
      return `-${width * 0.04 - 4}px`;
    } else if (transformOrigin === 'left') {
      return `${width * 0.04 - 4}px`;
    }
    return 0;
  };

  const getScale = () => {
    const anchorRect = anchorEl?.getBoundingClientRect();
    const popperRect = popperEl?.getBoundingClientRect();
    if (!anchorRect && !popperRect) return 0.7;
    if (!popperRect) return anchorRect.width / 350 - 0.01;
    return anchorRect.width / popperRect.width - 0.01;
  };

  const previewVariants = {
    initial: {
      opacity: 1,
      transformOrigin,
      scale: getScale(),
      translateX: getTranslateX(),
      translateY: '-52%',
    },
    animate: {
      opacity: 1,
      transformOrigin,
      scale: 1,
      translateX: getTranslateX(),
      translateY: '-66.666667%',
      transition: { duration: 0.25, ease: defaultEasing },
      willChange: 'opacity, transform',
    },
    exit: {
      opacity: 1,
      transformOrigin,
      scale: getScale(),
      translateX: getTranslateX(),
      translateY: '-52%',
      transition: { delay: 0.2, duration: 0.3, ease: defaultEasing },
      willChange: 'opacity, transform',
    },
  };

  return {
    previewVariants,
    getTranslateX,
  };
};

export default usePreviewPopper;
