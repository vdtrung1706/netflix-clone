// import { useState } from 'react';
import SignUp from '../components/layout/SignUp';
import logoUrl from '../assets/images/netflix-2015-logo.svg';
import { useState } from 'react';
import SignIn from '../components/layout/SignIn';
// import hero1800 from '../assets/images/hero-1800.jpg';

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div name="authContainer" className="relative min-h-full z-0 bg-black-pure">
      <div name="backgroundImage" className="hidden opacity-50">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/5a27cb25-33a9-4bcc-b441-95fefabcbd37/6bdbf132-dd7b-4d42-8f84-9139f9c4eaac/VN-en-20210823-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          srcSet="https://assets.nflxext.com/ffe/siteui/vlv3/5a27cb25-33a9-4bcc-b441-95fefabcbd37/6bdbf132-dd7b-4d42-8f84-9139f9c4eaac/VN-en-20210823-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/5a27cb25-33a9-4bcc-b441-95fefabcbd37/6bdbf132-dd7b-4d42-8f84-9139f9c4eaac/VN-en-20210823-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/5a27cb25-33a9-4bcc-b441-95fefabcbd37/6bdbf132-dd7b-4d42-8f84-9139f9c4eaac/VN-en-20210823-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w"
          alt=""
          className="border-0"
        />
      </div>

      <div name="loginContainer" className="h-11">
        <a href="/" className="inline-block ml-3%">
          <img src={logoUrl} alt="" className="h-5 pt-5" />
        </a>
      </div>

      <div
        name="loginBody"
        className="flex flex-col pt-5 px-5% min-h-550px w-full pb-8 rounded box-border"
      >
        {isSignIn ? (
          <SignIn setIsSignIn={setIsSignIn} />
        ) : (
          <SignUp setIsSignIn={setIsSignIn} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
