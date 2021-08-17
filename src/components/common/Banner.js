import requests from '../../services/requests';
import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { truncate } from '../../utils';
import { BASE_IMG_URL } from '../../services/requests';

export default function Banner() {
  const [movie, setMovie] = useState();
  const [data] = useFetch(requests.netflixOrignals);

  useEffect(() => {
    const indexRnd = Math.floor(Math.random() * data.length);
    setMovie(data[indexRnd]);
  }, [data]);

  return (
    <header
      className="w-full flex items-center relative h-screen bg-black bg-cover bg-no-repeat bg-top-center "
      style={{ backgroundImage: `url(${BASE_IMG_URL}${movie?.backdrop_path})` }}
    >
      <div className="flex flex-col items-start text-left z-10 py-0 pr-2 pl-11">
        <h1 className="font-bold text-2xl lg:text-5xl text-shadow lg:max-w-1/2">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <p className="w-5/12 leading-relaxed mt-4 text-xs lg:text-xl text-shadow">
          {truncate(movie?.overview, 200)}
        </p>

        <div className="flex gap-2 text-xs lg:text-base mt-4">
          <button className="flex items-center justify-center gap-3 w-32 py-2 rounded-lg cursor-pointer bg-white text-black-pure">
            <div className="h-7 w-7" role="presentation">
              <svg viewBox="0 0 24 24">
                <path d="M6 4l15 8-15 8z" fill="currentColor"></path>
              </svg>
            </div>
            <span className="font-bold">Play</span>
          </button>
          <button className="flex w-40 items-center justify-center gap-3 py-2 rounded-lg bg-grey bg-opacity-75 cursor-pointer text-white">
            <div className="h-7 w-7" role="presentation">
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
      <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-black" />
    </header>
  );
}
