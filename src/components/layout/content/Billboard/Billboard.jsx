import { IMAGE_BASE } from '@services/axios.service';
import { moviesRequests, tvshowsRequests } from '@services/requests.service';
import {
  fetchBillboardMovie,
  fetchBillboardTVShow,
} from '@store/devtools/billboardSlice';
import { truncate } from '@utils/convertor.utils';
import { defaultFadeInVariants, staggerOne } from '@utils/motion.utils';
import cx from 'classnames';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Billboard({ type }) {
  let selector = (state) => state.billboard.movie;
  if (type === 'TVSHOW') {
    selector = (state) => state.billboard.tvshow;
  }

  const { loading, error, data } = useSelector(selector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data && type === 'TVSHOW') {
      dispatch(fetchBillboardTVShow(tvshowsRequests.trendingSeries.url));
    }
    if (!data && type === 'MOVIE') {
      dispatch(fetchBillboardMovie(moviesRequests.netflixOrignal.url));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, type]);

  const billboardUrl =
    data?.backdrop_path && `${IMAGE_BASE}/original${data.backdrop_path}`;

  return (
    <motion.div
      variants={defaultFadeInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cx('pb-35% mb-5', { 'animate-pulse bg-black-light': loading })}
    >
      {error && <div>Billboard background error...</div>}

      {!loading && data && (
        <div className="absolute top-0 z-0 w-full">
          <div className="relative w-full">
            <img
              src={billboardUrl}
              alt="hero"
              className="w-full bg-repeat-x bg-cover bg-top-center"
            />
            <div className="absolute top-0 left-0 z-0 w-full h-full bg-black bg-opacity-20" />
            <div className="absolute top-0 bottom-0 left-0 right-2/3 opacity-70 bg-gradient-to-r from-black"></div>
            <div className="absolute bottom-0 left-0 right-0 top-auto z-10 h-10 bg-repeat-x bg-0-top bg-gradient-to-t from-black sm:h-20 md:h-32"></div>
            <div className="absolute right-0 bottom-1/5 flex justify-end items-center md:bottom-35%">
              <span className="flex items-center text-0.7rem border-l-2 border-solid border-white bg-black-lighter bg-opacity-70 pr-5 pl-2 h-5 sm:text-xs lg:h-9 lg:text-base lg:pr-10 lg:pl-3">
                {data.adult ? '18+' : '13+'}
              </span>
            </div>
          </div>

          <motion.div
            variants={staggerOne}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute top-0 bottom-1/5 left-4% flex flex-col justify-end w-6/12 z-10 md:bottom-35% lg:bottom-40% lg:w-4/12"
          >
            <div className="w-full">
              <div className="relative w-full">
                <h1 className="w-full text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-shadow">
                  {data?.title || data?.name || data?.original_name}
                </h1>
              </div>

              <div className="w-full">
                <p className="hidden mt-1 overflow-hidden text-xs leading-relaxed sm:block lg:text-base xl:text-lg text-shadow">
                  {truncate(data?.overview, 120)}
                </p>
              </div>

              <div className="flex gap-2 text-0.7rem sm:text-xs md:text-sm lg:text-base mt-4 h-8 md:h-9 lg:h-10">
                <a
                  href="/"
                  className="flex items-center justify-center w-24 gap-1 transition duration-300 ease-linear transform bg-white rounded cursor-pointer hover:bg-white-hover hover:opacity-60 md:w-28 md:py-2 text-black-pure"
                >
                  <div className="w-5 h-5 sm:h-6 sm:w-6" role="presentation">
                    <svg viewBox="0 0 24 24">
                      <path d="M6 4l15 8-15 8z" fill="currentColor"></path>
                    </svg>
                  </div>
                  <span className="font-bold">Play</span>
                </a>

                <button className="flex items-center justify-center w-32 gap-1 py-2 text-white transition duration-300 ease-linear rounded cursor-pointer hover:bg-grey-darker hover:bg-opacity-60 md:w-36 bg-grey bg-opacity-70">
                  <div className="w-5 h-5 sm:h-6 sm:w-6" role="presentation">
                    <svg viewBox="0 0 24 24">
                      <path
                        d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-2 0a8 8 0 0 0-8-8 8 8 0 0 0-8 8 8 8 0 0 0 8 8 8 8 0 0 0 8-8zm-9 6v-7h2v7h-2zm1-8.75a1.21 1.21 0 0 1-.877-.364A1.188 1.188 0 0 1 10.75 8c0-.348.123-.644.372-.886.247-.242.54-.364.878-.364.337 0 .63.122.877.364.248.242.373.538.373.886s-.124.644-.373.886A1.21 1.21 0 0 1 12 9.25z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                  <span className="font-bold">More Info</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
