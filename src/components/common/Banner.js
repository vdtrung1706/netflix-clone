import requests from '../../services/requests';
import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';

export default function Banner() {
  const baseURL = 'https://image.tmdb.org/t/p/original';
  const [movie, setMovie] = useState();
  const [data] = useFetch(requests.netflixOrignals);

  useEffect(() => {
    const indexRnd = Math.floor(Math.random() * data.length);
    setMovie(data[indexRnd]);
  }, [data]);

  return (
    <header
      className="w-full flex items-center relative h-screen bg-black bg-cover bg-no-repeat bg-top-center "
      style={{ backgroundImage: `url(${baseURL}${movie?.backdrop_path})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full z-0 bg-black bg-opacity-20" />
      <div className="flex flex-col items-start text-left z-10 py-0 pr-2 pl-11">
        <h1 className="leading-snug text-6xl text-shadow">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <p className="w-2/5 leading-snug mt-4 text-xl text-shadow">
          {movie?.overview}
        </p>
        <div className="text-base mt-4">
          <button className="inline-block w-28 py-2 rounded-md cursor-pointer border-0 bg-red text-white">
            Play
          </button>
          <button className="inline-block w-28 py-2 rounded-md cursor-pointer border-0 text-white">
            +Add to List
          </button>
        </div>
      </div>
    </header>
  );
}
