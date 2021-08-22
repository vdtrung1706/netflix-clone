import { useEffect, useState } from 'react';
import { useFetch } from '../../hooks';
import { randomIndex, truncate } from '../../utils';
import { IMAGE_BASE } from '../../services/api';
import requests from '../../services/requests';

function Banner() {
  const [movie, setMovie] = useState(null);
  const [movies] = useFetch(requests.netflixOrignals);

  useEffect(() => {
    const index = randomIndex(movies.length);
    setMovie(movies[index]);
  }, [movies]);

  const getBackgorundImage = () => {
    return movie ? `url(${IMAGE_BASE}/original${movie.backdrop_path})` : 'none';
  };

  return (
    <div
      className="w-full flex items-center relative h-screen bg-black bg-cover bg-no-repeat bg-top-center "
      style={{ backgroundImage: getBackgorundImage() }}
    >
      <div className="flex flex-col items-start text-left z-10 py-0 pr-2 px-4%">
        <h1 className="overflow-clip overflow-hidden w-7/12 font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-shadow">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <p className="overflow-clip overflow-hidden w-5/12 leading-relaxed mt-4 text-xs lg:text-base xl:text-lg text-shadow">
          {truncate(movie?.overview, 120)}
        </p>

        <div className="flex gap-2 text-xs md:text-sm lg:text-base mt-4">
          <button className="flex items-center transition duration-300 ease-linear hover:bg-white-darker transform justify-center gap-1 w-24 md:w-28 py-2 rounded cursor-pointer bg-white text-black-pure">
            <div className="h-6 w-6" role="presentation">
              <svg viewBox="0 0 24 24">
                <path d="M6 4l15 8-15 8z" fill="currentColor"></path>
              </svg>
            </div>
            <span className="font-bold">Play</span>
          </button>

          <button className="flex transition duration-300 ease-linear hover:bg-grey-darker hover:bg-opacity-60 w-32 md:w-36 items-center justify-center gap-1 py-2 rounded bg-grey bg-opacity-70 cursor-pointer text-white">
            <div className="h-6 w-6" role="presentation">
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

      <div className="absolute top-0 left-0 w-full h-full z-0 bg-black bg-opacity-20" />
      <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-black" />
    </div>
  );
}

export default Banner;
