import { useEffect, useState } from 'react';
import axios from '../services/axios';
import { paginationIndicator } from '../utils';

const useSlider = (windowWidth, containerRef, url) => {
  // to calculate does the slider have next or pre item
  const [viewed, setViewed] = useState(0);

  // to slide by distance
  const [distance, setDistance] = useState(0);

  const [containerWidth, setContainerWidth] = useState(0);
  const [totalInViewport, setTotalInViewport] = useState(0);

  const [movies, setMovies] = useState([]);

  // slider status
  const [sliderIndex, setSliderIndex] = useState(0);
  const [sliderPages, setSliderPages] = useState(0);

  const hasPrev = distance < 0;
  const hasNext = viewed + totalInViewport < movies.length;

  useEffect(() => {
    fetchMovies(url);

    if (containerRef.current && movies.length > 0) {
      const containerEl = containerRef.current;

      const containerWidth = containerEl.clientWidth;
      const itemWidth = containerEl.firstChild.clientWidth;

      const totalInViewport = Math.ceil(containerWidth / itemWidth);

      setContainerWidth(containerWidth);
      setTotalInViewport(totalInViewport);
      setSliderPages(movies.length / totalInViewport);
    }

    async function fetchMovies(url) {
      const res = await axios.get(url);
      setMovies(res.data.results);
    }
  }, [containerRef, movies.length, url, windowWidth]);

  const moveSection = type => {
    if (type === 'RIGHT') {
      setViewed(viewed + totalInViewport);
      setDistance(distance - containerWidth);
      setSliderIndex(pre => pre + 1);
    }

    if (type === 'LEFT') {
      setViewed(viewed - totalInViewport);
      setDistance(distance + containerWidth);
      setSliderIndex(pre => pre - 1);
    }

    if (type === 'RESET') {
      setViewed(0);
      setDistance(0);
      setSliderIndex(0);
    }
  };

  return {
    hasNext,
    hasPrev,
    sliderPages,
    movies,
    distance,
    sliderIndex,
    moveSection,
    paginationIndicator,
  };
};

export default useSlider;
