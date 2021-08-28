import SignUp from '../components/layout/SignUp';
import logoUrl from '../assets/images/netflix-2015-logo.svg';
import { useState } from 'react';
import SignIn from '../components/layout/SignIn';
import hero from '../assets/images/hero.jpg';
import hero1000 from '../assets/images/hero.jpg';
import hero1500 from '../assets/images/hero-1000.jpg';
import hero1800 from '../assets/images/hero-1500.jpg';

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div
      name="authContainer"
      className="relative min-h-full z-0 bg-black-pure md:min-h-full"
    >
      <div
        name="backgroundWrapper"
        className="hidden absolute w-full h-full min-h-screen opacity-50 -z-1 md:block"
      >
        <img
          src={hero}
          srcSet={`${hero1000} 1000w, ${hero1500} 1500w, ${hero1800} 1800w`}
          alt="hero"
          className="border-0 min-w-full min-h-full"
        />
      </div>

      <div name="loginHeader" className="h-11 sm:h-20 md:h-24">
        <a href="/" className="inline-block ml-3%">
          <img src={logoUrl} alt="logo" className="h-5 sm:h-11 pt-5" />
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
    </div>
  );
};

export default AuthPage;
