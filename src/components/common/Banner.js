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
        <h1 className="leading-snug text-3xl lg:text-6xl text-shadow lg:max-w-1/2">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <p className="w-5/12 leading-relaxed mt-4 text-xs lg:text-xl text-shadow">
          {truncate(movie?.overview, 200)}
        </p>

        <div className="text-xs lg:text-base mt-4">
          <button className="inline-block w-28 py-2 rounded-md cursor-pointer border-0 bg-red text-white">
            Play
          </button>
          <button className="inline-block w-28 py-2 rounded-md cursor-pointer border-0 text-white">
            +Add to List
          </button>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full z-0 bg-black bg-opacity-20" />
      <div className="absolute bottom-0 left-0 w-full h-28 bg-header-gradient" />
    </header>
  );
}
