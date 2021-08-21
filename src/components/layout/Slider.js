import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import axios from '../../services/axios';
import requests from '../../services/requests';
import SliderPoster from '../common/SliderPoster';

export const Slider = ({ title }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies(requests.adventureMovies);

    async function fetchMovies(url) {
      let res = await axios.get(url);
      setMovies(res.data.results);
    }
  }, []);

  return (
    <div className="my-1.5vw relative group">
      <a
        className="mx-4% mb-0.5em flex items-baseline whitespace-nowrap w-max font-bold"
        href={'/'}
      >
        <div className="text-xl">{title}</div>
        <div className="text-xs flex items-baseline w-0 opacity-0 transition-all transform ease-linear duration-400 group-hover:w-auto group-hover:opacity-100 group-hover:translate-x-3">
          <div>Explore All</div>
          <div className="text-xs ml-1">
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
      </a>

      <div className="ralative transition duration-500">
        <div className="px-4% relative">
          <div className="overflow-hidden pb-1px">
            <div className={`whitespace-nowrap`}>
              {movies.map(movie => {
                return <SliderPoster key={movie.id} movie={movie} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
