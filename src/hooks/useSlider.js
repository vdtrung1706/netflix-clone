import cx from 'classnames';
import { useEffect, useState } from 'react';

const useSlider = (ref, movies = [], width) => {
  const [viewed, setViewed] = useState(0);
  const [distance, setDistance] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [totalInViewport, setTotalInViewport] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const hasPre = distance < 0;
  const hasNext = viewed + totalInViewport < movies.length;

  useEffect(() => {
    if (ref.current && ref.current.firstChild && movies) {
      const sliderWidth = ref.current.clientWidth;
      const itemWidth = ref.current.firstChild.clientWidth;

      const totalInViewport = Math.ceil(sliderWidth / itemWidth);

      setSliderWidth(sliderWidth);
      setTotalInViewport(totalInViewport);
      setTotalPages(movies.length / totalInViewport);
    }
  }, [ref, movies, width]);

  const moveSection = (type) => {
    if (type === 'RIGHT') {
      setViewed(viewed + totalInViewport);
      setDistance(distance - sliderWidth);
      setCurrentPage((pre) => pre + 1);
    }

    if (type === 'LEFT') {
      setViewed(viewed - totalInViewport);
      setDistance(distance + sliderWidth);
      setCurrentPage((pre) => pre - 1);
    }

    if (type === 'RESET') {
      setViewed(0);
      setDistance(0);
      setCurrentPage(0);
    }
  };

  const paginationIndicator = () => {
    if (totalPages <= 0) return;

    return Array(Math.ceil(totalPages))
      .fill(0)
      .map((_, index) => {
        const className = cx(`inline-block w-3 h-2px ml-1px`, {
          'bg-white': currentPage == index,
          'bg-grey-darker': currentPage != index,
        });

        return <li key={index} className={className}></li>;
      });
  };

  return {
    hasNext,
    hasPre,
    totalPages,
    movies,
    distance,
    currentPage,
    moveSection,
    paginationIndicator,
  };
};

export default useSlider;
