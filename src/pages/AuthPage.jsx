// import { useState } from 'react';
import SignUp from '../components/layout/SignUp';
import logoUrl from '../assets/images/netflix-2015-logo.svg';
// import hero1800 from '../assets/images/hero-1800.jpg';

const AuthPage = () => {
  return (
    <div
      name="AuthContainer"
      className="h-full relative min-h-full z-0 bg-black-pure"
    >
      <div name="bg-img" className="hidden opacity-50">
        <img
          className="border-0"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/5a27cb25-33a9-4bcc-b441-95fefabcbd37/6bdbf132-dd7b-4d42-8f84-9139f9c4eaac/VN-en-20210823-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          srcSet="https://assets.nflxext.com/ffe/siteui/vlv3/5a27cb25-33a9-4bcc-b441-95fefabcbd37/6bdbf132-dd7b-4d42-8f84-9139f9c4eaac/VN-en-20210823-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/5a27cb25-33a9-4bcc-b441-95fefabcbd37/6bdbf132-dd7b-4d42-8f84-9139f9c4eaac/VN-en-20210823-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/5a27cb25-33a9-4bcc-b441-95fefabcbd37/6bdbf132-dd7b-4d42-8f84-9139f9c4eaac/VN-en-20210823-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w"
          alt=""
        />
      </div>

      <div name="LoginHeader" className="h-11">
        <a href="/" className="inline-block ml-3%">
          <img className="h-5 pt-5" src={logoUrl} alt="" />
        </a>
      </div>

      <SignUp />
    </div>
  );
};

export default AuthPage;
