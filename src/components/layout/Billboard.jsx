import { useEffect } from 'react';
import { truncate } from '../../utils';
import { IMAGE_BASE } from '../../services/axios';
import { moviesRequests } from '../../services/requests';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBillboardFromAPI } from '../../redux/devtools/billboardSlice';

const Billboard = () => {
  const { loading, error, movie } = useSelector(state => state.billboard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBillboardFromAPI(moviesRequests.netflixOrignal.url));
  }, [dispatch]);

  return (
    <div name="billboardContent" className="pb-35% mb-5">
      {loading && <div>Billboard background loading...</div>}
      {error && <div>Billboard background error...</div>}

      {movie && (
        <div name="billboardBase" className="absolute top-0 z-0">
          <div name="billboardImgWrapper" className="relative">
            <img
              src={
                movie?.backdrop_path &&
                `${IMAGE_BASE}/original${movie.backdrop_path}`
              }
              alt="hero"
              className="w-full bg-cover bg-repeat-x bg-top-center"
            />
            <div className="absolute top-0 left-0 w-full h-full z-0 bg-black bg-opacity-20" />
            <div className="absolute top-0 bottom-0 left-0 right-2/3 opacity-70 bg-gradient-to-r from-black"></div>
            <div className="absolute left-0 right-0 top-auto bottom-0 bg-repeat-x bg-0-top z-10 h-10 bg-gradient-to-t from-black sm:h-20 md:h-32"></div>
            <div className="absolute right-0 bottom-1/5 flex justify-end items-center md:bottom-35%">
              <span className="flex items-center text-0.7rem border-l-2 border-solid border-white bg-black bg-opacity-60 pr-5 pl-2 h-5 sm:text-xs lg:h-9 lg:text-base lg:pr-10 lg:pl-3">
                18+
              </span>
            </div>
          </div>

          <div className="absolute top-0 bottom-1/5 left-4% flex flex-col justify-end w-6/12 z-10 md:bottom-35% lg:bottom-40% lg:w-4/12">
            <div className="w-full">
              <div name="billboardTitle" className="relative w-full">
                <h1 className="w-full font-bold text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-shadow">
                  {movie?.title || movie?.name || movie?.original_name}
                </h1>
              </div>

              <div name="billboardDescription" className="w-full">
                <p className="overflow-hidden leading-relaxed mt-1 text-xs hidden sm:block lg:text-base xl:text-lg text-shadow">
                  {truncate(movie?.overview, 120)}
                </p>
              </div>

              <div
                name="billboardLink"
                className="flex gap-2 text-0.7rem sm:text-xs md:text-sm lg:text-base mt-4 h-8 md:h-9 lg:h-10"
              >
                <a
                  href="/"
                  className="flex items-center transition duration-300 ease-linear hover:bg-white-darker transform justify-center gap-1 w-24 md:w-28 md:py-2 rounded cursor-pointer bg-white text-black-pure"
                >
                  <div className="h-5 w-5 sm:h-6 sm:w-6" role="presentation">
                    <svg viewBox="0 0 24 24">
                      <path d="M6 4l15 8-15 8z" fill="currentColor"></path>
                    </svg>
                  </div>
                  <span className="font-bold">Play</span>
                </a>

                <button className="flex items-center justify-center gap-1 transition duration-300 ease-linear hover:bg-grey-darker hover:bg-opacity-60 w-32 md:w-36 py-2 rounded bg-grey bg-opacity-70 cursor-pointer text-white">
                  <div className="h-5 w-5 sm:h-6 sm:w-6" role="presentation">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Billboard;
