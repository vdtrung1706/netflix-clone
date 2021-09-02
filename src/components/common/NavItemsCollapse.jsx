import { motion, AnimatePresence } from 'framer-motion';
import onClickOutside from 'react-onclickoutside';
import { ARROW_POINT_UP } from '../../assets';
import { profileFadeInVariants } from '../../utils/motionUtils';
import PrimaryNavItems from './PrimaryNavItems';

const NavItemsCollapse = ({ setExpanded }) => {
  NavItemsCollapse.handleClickOutside = event => {
    if (event.path && event.path[0] && event.path[0].tagName != 'BUTTON') {
      setExpanded(false);
    }
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        variants={profileFadeInVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="absolute bg-black-pure opacity-90 -ml-20 top-16"
      >
        <div className="absolute left-1/2 -top-3 h-4 w-4">
          <img src={ARROW_POINT_UP} alt={'browse'} />
        </div>
        <ul className="p-0 h-auto border-t-2 border-solid border-white">
          <PrimaryNavItems listItemsClassName="flex items-center justify-around leading-6 w-64 h-12" />
        </ul>
      </motion.div>
    </AnimatePresence>
  );
};

const clickOutsideConfig = {
  handleClickOutside: () => NavItemsCollapse.handleClickOutside,
};

export default onClickOutside(NavItemsCollapse, clickOutsideConfig);
