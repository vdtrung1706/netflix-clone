import { useState } from 'react';
import logoUrl from '../assets/images/netflix-2015-logo.svg';
import hero from '../assets/images/hero.jpg';
import hero1000 from '../assets/images/hero-1000.jpg';
import hero1500 from '../assets/images/hero-1500.jpg';
import hero1800 from '../assets/images/hero-1800.jpg';
import { Link } from 'react-router-dom';

const IndexPage = () => {
  return (
    <div className="bg-black-pure">
      <GreetingHeader />
      <StoryCard />
      <div>This is second card</div>
    </div>
  );
};

const GreetingHeader = () => {
  return (
    <div className="relative text-base pt-5 z-10">
      <div className="flex flex-row flex-nowrap items-center mx-4% pt-2 relative justify-between">
        <a
          href="/"
          className="w-logo-xs sm:w-logo-sm lg:w-logo-lg 2xl:w-logo-2xl"
        >
          <img src={logoUrl} alt="logo" />
        </a>
        <Link
          to="/login"
          className="rounded-sm bg-red px-3 py-2px text-sm sm:py-1 sm:text-base sm:px-4"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

const StoryCard = () => {
  const [email, setEmail] = useState('');

  return (
    <div className="relative border-b-8 border-solid border-black-light py-12 px-4% lg:min-h-screen">
      <div className="absolute left-0 right-0 bottom-0 -top-20 overflow-hidden">
        <div className="absolute bottom-0 top right-0 left-0 h-full">
          <img
            className="w-full h-full object-cover max-w-full"
            src={hero}
            srcSet={`${hero1000} 1000w, ${hero1500} 1500w, ${hero1800} 1800w`}
            alt="hero"
          />
          <div
            className="absolute top-0 left-0 bottom-0 right-0 bg-black-pure bg-opacity-40"
            style={{
              backgroundImage:
                'linear-gradient(to top,rgba(0,0,0,.8) 0,rgba(0,0,0,0) 60%,rgba(0,0,0,.8) 100%)',
            }}
          ></div>
        </div>
      </div>

      <div className="relative w-full text-center z-10 py-4 sm:py-20">
        <h1 className="text-1.75rem sm:text-3.125rem font-bold m-auto mx-6 sm:mx-auto max-w-2xl">
          Unlimited movies, TV shows, and more.
        </h1>
        <h2 className="text-lg my-4 mx-auto sm:text-1.625rem font-medium">
          Watch anywhere. Cancel anytime.
        </h2>
        <form className="flex flex-col font-medium" method="GET">
          <h3 className="text-lg leading-tight m-auto pb-5 sm:px-12 font-normal md:px-4% md:mx-4% xl:mx-28 md:text-xl lg:text-xl">
            Ready to watch? Enter your email to create or restart your
            membership.
          </h3>

          <div className="relative overflow-hidden flex items-center flex-col gap-4 w-full m-auto md:max-w-lg lg:max-w-4xl lg:flex-row lg:justify-center lg:gap-0">
            <div className="bg-white border-solid border-b-2 border-opacity-0 border-red focus-within:border-opacity-100 transition-opacity duration-700 ease-linear rounded sm:min-w-550px md:max-w-lg lg:min-w-max lg:rounded-tr-none lg:rounded-br-none">
              <div className="px-2 md:px-8 lg:px-2">
                <input
                  className="text-black-pure min-w-450px md:min-w-550px h-12 w-full outline-none border-none bg-transparent text-base font-medium md:h-14"
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                  maxLength="50"
                  minLength="5"
                />
              </div>
            </div>

            <button
              className="flex items-center justify-center gap-2 px-3 h-10 border-solid border-b-2 border-opacity-0 border-red bg-red md:h-12 lg:h-14 lg:rounded-tl-none lg:rounded-bl-none hover:bg-red-hover"
              type="submit"
              autoComplete="off"
              role="link"
            >
              <span className="text-base whitespace-nowrap lg:text-1.625rem">
                Get Started
              </span>
              <div className="w-2 lg:w-3">
                <svg viewBox="0 0 6 12" xmlns="http://www.w3.org/2000/svg">
                  <desc>chevron</desc>
                  <path
                    d="M.61 1.312l.78-.624L5.64 6l-4.25 5.312-.78-.624L4.36 6z"
                    fill="white"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
        </form>
      </div>
      <div className="center-pixel absolute top-1/2 left-1/2"></div>
    </div>
  );
};

export default IndexPage;
