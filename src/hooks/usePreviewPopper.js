import { defaultEasing } from '@utils/motion.utils';
import useViewport from './useViewport';

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

  const anchorRect = anchorEl?.getBoundingClientRect();
  const popperRect = popperEl?.getBoundingClientRect();

  const getScale = () => {
    if (!anchorRect && !popperRect) return 0.7;
    if (!popperRect) return (anchorRect.width - 4) / 350;
    return (anchorRect.width - 4) / popperRect.width;
  };

  const previewVariants = {
    initial: {
      transformOrigin,
      scale: getScale(),
      translateX: getTranslateX(),
      translateY: '-52%',
      willChange: 'opacity, transform',
    },
    animate: {
      opacity: 1,
      transformOrigin,
      scale: 1,
      translateX: getTranslateX(),
      translateY: '-66.666667%',
      transition: { duration: 0.65, ease: defaultEasing },
      willChange: 'opacity, transform',
    },
    exit: {
      opacity: 0,
      transformOrigin,
      scale: getScale(),
      translateX: getTranslateX(),
      translateY: '-52%',
      transition: { duration: 0.35, ease: defaultEasing },
      willChange: 'opacity, transform',
    },
  };

  return {
    previewVariants,
    getTranslateX,
  };
};

export default usePreviewPopper;
