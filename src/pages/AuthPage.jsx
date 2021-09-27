import { HERO, HERO_1000, HERO_1500, HERO_1800, NETFLIX_LOGO } from '@assets';
import Layout from '@components/common/Layout';
import SignIn from '@components/layout/auth/SignIn';
import CircleLoading from '@components/layout/loader/CircleLoading';
import { selectUser } from '@store/auth/selectors.auth';
import { defaultPageFadeInVariants } from '@utils/motion.utils';
import { motion } from 'framer-motion';
import { lazy, Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';

const SignUp = lazy(() => import('@components/layout/auth/SignUp'));

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const { loading } = useSelector(selectUser);

  const { state } = useLocation();

  useEffect(() => {
    if (state !== undefined && state.isSignUp === true) {
      setIsSignIn(false);
    }
  }, [state]);

  return (
    <Layout title="Login - Netflix">
      <motion.div
        variants={defaultPageFadeInVariants}
        initial="initial"
        animate="animate"
        className="relative z-0 min-h-full bg-black-pure md:min-h-full"
      >
        {loading && (
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-black-pure bg-opacity-60 z-75">
            <CircleLoading className="absolute w-1/3 transform -translate-x-1/2 -translate-y-1/2 bg-transparent select-none z-75 top-1/2 left-1/2 sm:w-1/4 lg:w-1/6" />
          </div>
        )}

        <div className="absolute hidden w-full h-full min-h-screen opacity-50 select-none -z-1 md:block">
          <img
            src={HERO}
            srcSet={`${HERO_1000} 1000w, ${HERO_1500} 1500w, ${HERO_1800} 1800w`}
            alt="hero"
            className="min-w-full min-h-full border-0"
          />
        </div>
        <div className="select-none h-11 sm:h-20 md:h-24">
          <a href="/" className="inline-block ml-3%">
            <img src={NETFLIX_LOGO} alt="logo" className="h-5 pt-5 sm:h-11" />
          </a>
        </div>
        <div className="md:pb-10 md:m-auto md:min-h-660px md:max-w-md">
          <div className="flex flex-col pt-5 px-5% min-h-550px w-full pb-8 rounded box-border md:p-14 md:bg-black-pure md:bg-opacity-75">
            <Suspense fallback={null}>
              {isSignIn ? (
                <SignIn setIsSignIn={setIsSignIn} />
              ) : (
                <SignUp
                  setIsSignIn={setIsSignIn}
                  defaultEmail={state?.email || ''}
                />
              )}
            </Suspense>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
