export const defaultEasing = [0.25, -0.05, 0.01, 0.99];

export const staggerHalf = {
  animate: { transition: { staggerChildren: 0.05 } },
};

export const defaultPageFadeInVariants = {
  initial: {
    opacity: 0,
    transition: { duration: 0.4, ease: defaultEasing },
    willChange: 'opacity',
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.4, ease: defaultEasing },
    willChange: 'opacity',
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: defaultEasing },
    willChange: 'opacity',
  },
};

export const defaultFadeInVariants = {
  initial: {
    opacity: 0,
    transition: { duration: 0.2, ease: defaultEasing },
    willChange: 'opacity',
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.2, ease: defaultEasing },
    willChange: 'opacity',
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: defaultEasing },
    willChange: 'opacity',
  },
};

export const profileFadeInVariants = {
  initial: {
    opacity: 0,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'opacity',
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'opacity',
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.4, ease: defaultEasing },
    willChange: 'opacity',
  },
};

export const loginFadeInVariants = {
  initial: {
    x: 25,
    opacity: 0,
    transition: { duration: 0.8, ease: defaultEasing },
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: defaultEasing },
  },
};

export const navFadeInVariants = {
  initial: { opacity: 0, transition: { duration: 0.2 } },
  animate: { opacity: 1, transition: { duration: 0.2 } },
};

export const modalVariants = {
  initial: {
    opacity: 0,
    scale: 0.6,
    transition: { duration: 0.7, ease: defaultEasing },
    willChange: 'opacity',
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: defaultEasing },
    willChange: 'opacity',
  },
  exit: {
    opacity: 0,
    scale: 0.7,
    transition: { duration: 0.5, ease: defaultEasing },
    willChange: 'opacity',
  },
};
