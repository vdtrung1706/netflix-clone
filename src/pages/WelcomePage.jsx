import { HERO, HERO_1000, HERO_1500, HERO_1800, NETFLIX_LOGO } from '@assets';
import FOR_KIDS from '@assets/images/for_kids.png';
import TV from '@assets/images/tv.png';
import MOBILE from '@assets/images/mobile.jpg';
import Layout from '@components/common/Layout';
import { defaultPageFadeInVariants } from '@utils/motion.utils';
import { motion } from 'framer-motion';
import { PureComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import QuestionCards from '@components/common/QuestionCards';

export default function WelcomePage() {
  return (
    <Layout title="Netflix - Watch TV Shows Online, Watch Movies Online">
      <motion.div
        variants={defaultPageFadeInVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="bg-black-pure"
      >
        <WelcomeHeader />
        <StoryCard />
        <SecondCard />
        <ThirdCard />
        <FourthCard />
        <FifthCard />

        <div className="flex flex-col items-center content-center max-w-screen-xl p-12 mx-auto">
          <div className="mb-8 text-4xl font-bold xl:text-5xl text">
            Frequently Asked Questions
          </div>
          <div className="flex flex-col w-10/12 lg:w-8/12">
            <QuestionCards />
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}

class SecondCard extends PureComponent {
  render() {
    return (
      <div className="p-12 border-b-8 border-black">
        <div className="flex flex-col items-center content-center w-full max-w-screen-lg mx-auto lg:flex-row">
          <div className="flex flex-col items-center w-full gap-5 text-center lg:text-left lg:w-1/2 lg:items-start">
            <div className="text-4xl font-bold xl:text-5xl">
              Enjoy on your TV.
            </div>
            <div className="text-xl xl:text-2xl">
              Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV,
              Blu-ray players, and more.
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="relative w-full">
              <img className="relative w-full z-2" src={TV} alt="tv" />
              <div
                style={{
                  maxWidth: '73%',
                  maxHeight: '53%',
                  top: '47%',
                  left: '49.5%',
                }}
                className="absolute top-0 left-0 w-full h-full transform -translate-x-1/2 -translate-y-1/2 z-1"
              >
                <video
                  autoPlay
                  playsInline
                  muted
                  loop
                  className="object-cover object-center w-full h-full"
                  type="video/mp4"
                  src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class ThirdCard extends PureComponent {
  render() {
    return (
      <div className="p-12 border-b-8 border-black">
        <div className="flex flex-col-reverse items-center justify-between w-full max-w-screen-xl mx-auto lg:flex-row">
          <img className="relative w-full lg:w-1/2" src={MOBILE} alt="mobile" />
          <div className="flex flex-col items-center w-full gap-5 text-center lg:text-left">
            <div className="text-4xl font-bold xl:text-5xl">
              Download your shows to watch offline.
            </div>
            <div className="text-xl xl:text-2xl">
              Save your favorites easily and always have something to watch.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class FourthCard extends PureComponent {
  render() {
    return (
      <div className="p-12 border-b-8 border-black">
        <div className="flex items-center justify-start max-w-screen-lg mx-auto ">
          <div className="flex flex-col items-center w-full gap-5 text-center lg:text-left lg:items-start lg:w-1/2">
            <div className="text-4xl font-bold xl:text-5xl">
              Watch everywhere.
            </div>
            <div className="text-xl xl:text-2xl">
              Stream unlimited movies and TV shows on your phone, tablet,
              laptop, and TV.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class FifthCard extends PureComponent {
  render() {
    return (
      <div className="p-12 border-b-8 border-black">
        <div className="flex flex-col-reverse items-center justify-between w-full max-w-screen-xl mx-auto lg:flex-row">
          <img
            className="relative w-full lg:w-1/2"
            src={FOR_KIDS}
            alt="for_kids"
          />
          <div className="flex flex-col items-center w-full gap-5 text-center lg:text-left lg:w-1/2 lg:items-start">
            <div className="text-4xl font-bold xl:text-5xl">
              Create profiles for kids.
            </div>
            <div className="text-xl xl:text-2xl">
              Send kids on adventures with their favorite characters in a space
              made just for them—free with your membership.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const WelcomeHeader = () => {
  return (
    <div className="relative z-10 pt-5 text-base">
      <div className="flex flex-row flex-nowrap items-center mx-4% pt-2 relative justify-between">
        <Link
          to="/"
          className="w-logo-xs sm:w-logo-sm lg:w-logo-lg 2xl:w-logo-2xl"
        >
          <img src={NETFLIX_LOGO} alt="logo" />
        </Link>
        <Link
          to="/login"
          className="px-3 text-sm rounded-sm bg-red py-2px sm:py-1 sm:text-base sm:px-4"
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
    <div className="relative border-b-8 border-solid border-black-light py-12 px-5% lg:min-h-screen">
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden -top-20">
        <div className="absolute bottom-0 left-0 right-0 h-full top">
          <img
            className="object-cover w-full h-full max-w-full"
            src={HERO}
            srcSet={`${HERO_1000} 1000w, ${HERO_1500} 1500w, ${HERO_1800} 1800w`}
            alt="hero"
          />
          <div
            className="absolute top-0 bottom-0 left-0 right-0 bg-black-pure bg-opacity-40"
            style={{
              backgroundImage:
                'linear-gradient(to top,rgba(0,0,0,.8) 0,rgba(0,0,0,0) 60%,rgba(0,0,0,.8) 100%)',
            }}
          ></div>
        </div>
      </div>

      <div className="relative z-10 w-full py-4 text-center sm:py-20">
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

          <div className="relative flex flex-col items-center w-full gap-4 m-auto overflow-hidden md:max-w-lg lg:max-w-4xl lg:flex-row lg:justify-center lg:gap-0">
            <div className="transition-opacity duration-700 ease-linear bg-white border-b-2 border-opacity-0 border-solid rounded border-red focus-within:border-opacity-100 sm:min-w-550px md:max-w-lg lg:min-w-max lg:rounded-tr-none lg:rounded-br-none">
              <div className="px-2 md:px-8 lg:px-2">
                <input
                  className="w-full h-12 text-base font-medium bg-transparent border-none outline-none text-black-pure min-w-450px md:min-w-550px md:h-14"
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  maxLength="50"
                  minLength="5"
                />
              </div>
            </div>

            <button
              className="flex items-center justify-center h-10 gap-2 px-3 border-b-2 border-opacity-0 border-solid border-red bg-red md:h-12 lg:h-14 lg:rounded-tl-none lg:rounded-bl-none hover:bg-red-hover"
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
      <div className="absolute center-pixel top-1/2 left-1/2"></div>
    </div>
  );
};
