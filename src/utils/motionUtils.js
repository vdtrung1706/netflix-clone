export const defaultEasing = [0.25, -0.05, 0.01, 0.99];

export const staggerHalf = {
  animate: { transition: { staggerChildren: 0.05 } },
};

export const defaultPageFadeInVariants = {
  initial: {
    opacity: 0,
    transition: { duration: 0.4, ease: defaultEasing },
    willChange: 'opacity, transform',
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.4, ease: defaultEasing },
    willChange: 'opacity, transform',
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.4, ease: defaultEasing },
    willChange: 'opacity, transform',
  },
};
