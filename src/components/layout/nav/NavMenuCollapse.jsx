import { ARROW_POINT_UP } from '@assets';
import useOutside from '@hooks/useOutside';
import { profileFadeInVariants } from '@utils/motion.utils';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import NavMenu from './NavMenu';

const NavMenuCollapse = ({ setOpen }) => {
  const ref = useRef(null);

  useOutside(ref, (event) => {
    if (event.path && event.path[0] && event.path[0].tagName != 'BUTTON') {
      setOpen(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      variants={profileFadeInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="absolute -ml-20 bg-black-pure opacity-90 top-16"
    >
      <div className="absolute w-4 h-4 left-1/2 -top-3">
        <img src={ARROW_POINT_UP} alt={'browse'} />
      </div>
      <ul className="h-auto p-0 border-t-2 border-white border-solid">
        <NavMenu className="flex items-center justify-around w-64 h-12 leading-6" />
      </ul>
    </motion.div>
  );
};

export default NavMenuCollapse;
