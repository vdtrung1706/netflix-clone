import { KIDS, PROFILE_DEFAULT } from '@assets';
import { authActions } from '@store/auth/slice.auth';
import { profileFadeInVariants } from '@utils/motion.utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function ProfileMenu({ currentUser, open, setOpen }) {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(authActions.signOutStart());
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          onMouseLeave={() => setOpen(false)}
          variants={profileFadeInVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute -ml-32 text-xs border-2 border-solid bg-black-pure bg-opacity-90 w-36 top-10 sm:top-14 sm:-ml-36 sm:w-48 lg:text-sm border-black-lighter border-opacity-30"
        >
          <ul className="flex flex-col gap-2 px-2 py-3">
            <li className="hover:underline">
              <Link
                to="/profiles/manage/1001"
                className="flex items-center justify-start gap-2"
              >
                <img
                  src={
                    currentUser?.photoURL
                      ? currentUser.photoURL
                      : PROFILE_DEFAULT
                  }
                  alt="profile"
                  className="w-8 rounded"
                />
                <span>{currentUser.displayName}</span>
              </Link>
            </li>

            <li className="hover:underline">
              <Link
                to="/kids"
                className="flex items-center justify-start gap-2"
              >
                <img src={KIDS} alt="kids" className="w-8 rounded" />
                <span>Kids</span>
              </Link>
            </li>

            <li className="hover:underline">
              <Link to="/profiles/manage">Manage Profiles</Link>
            </li>
          </ul>

          <div className="h-1px bg-black-lighter bg-opacity-70"></div>

          <ul className="flex flex-col h-auto gap-2 px-2 py-3">
            <li className="hover:underline">
              <Link to="/your-account">Your account</Link>
            </li>

            <li className="hover:underline">
              <Link to="/help-center">Help center</Link>
            </li>

            <li>
              <button onClick={handleSignOut} className="hover:underline">
                Sign out of Netflix
              </button>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
