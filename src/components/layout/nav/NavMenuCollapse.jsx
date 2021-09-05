import { ARROW_POINT_UP } from '@assets';
import { profileFadeInVariants } from '@utils/motion.utils';
import { AnimatePresence, motion } from 'framer-motion';
import onClickOutside from 'react-onclickoutside';
import NavMenu from './NavMenu';

const NavMenuCollapse = ({ setOpen }) => {
  NavMenuCollapse.handleClickOutside = (event) => {
    if (event.path && event.path[0] && event.path[0].tagName != 'BUTTON') {
      setOpen(false);
    }
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
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
          <NavMenu listItemsClassName="flex items-center justify-around leading-6 w-64 h-12" />
        </ul>
      </motion.div>
    </AnimatePresence>
  );
};

const clickOutsideConfig = {
  handleClickOutside: () => NavMenuCollapse.handleClickOutside,
};

export default onClickOutside(NavMenuCollapse, clickOutsideConfig);
