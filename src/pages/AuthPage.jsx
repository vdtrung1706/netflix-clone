import { useState } from 'react';
import { motion } from 'framer-motion';
import SignUp from '../components/layout/SignUp';
import SignIn from '../components/layout/SignIn';
import { defaultPageFadeInVariants } from '../utils/motionUtils';
import { NETFLIX_LOGO, HERO, HERO_1000, HERO_1500, HERO_1800 } from '../assets';

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <motion.div
      variants={defaultPageFadeInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      name="authContainer"
      className="relative min-h-full z-0 bg-black-pure md:min-h-full"
    >
      <div
        name="backgroundWrapper"
        className="hidden absolute w-full h-full min-h-screen opacity-50 -z-1 md:block"
      >
        <img
          src={HERO}
          srcSet={`${HERO_1000} 1000w, ${HERO_1500} 1500w, ${HERO_1800} 1800w`}
          alt="hero"
          className="border-0 min-w-full min-h-full"
        />
      </div>

      <div name="loginHeader" className="h-11 sm:h-20 md:h-24">
        <a href="/" className="inline-block ml-3%">
          <img src={NETFLIX_LOGO} alt="logo" className="h-5 sm:h-11 pt-5" />
        </a>
      </div>

      <div
        name="loginBody"
        className="md:pb-10 md:m-auto md:min-h-660px md:max-w-md"
      >
        <div
          name="loginBodyWrapper"
          className="flex flex-col pt-5 px-5% min-h-550px w-full pb-8 rounded box-border md:p-14 md:bg-black-pure md:bg-opacity-75"
        >
          {isSignIn ? (
            <SignIn setIsSignIn={setIsSignIn} />
          ) : (
            <SignUp setIsSignIn={setIsSignIn} />
          )}
        </div>
      </div>
    </motion.div>
  );
}
