import { useEffect, useState } from 'react';
import cx from 'classnames';
import useViewport from './use-viewport';

function useSlider(ref, movies = []) {
  const [viewed, setViewed] = useState(0);
  const [distance, setDistance] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [totalInViewport, setTotalInViewport] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const { width } = useViewport();

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

  const moveSection = type => {
    if (type === 'RIGHT') {
      setViewed(viewed + totalInViewport);
      setDistance(distance - sliderWidth);
      setCurrentPage(pre => pre + 1);
    }

    if (type === 'LEFT') {
      setViewed(viewed - totalInViewport);
      setDistance(distance + sliderWidth);
      setCurrentPage(pre => pre - 1);
    }

    if (type === 'RESET') {
      setViewed(0);
      setDistance(0);
      setCurrentPage(0);
    }
  };

  const paginationIndicator = pageLength => {
    var listItems = [];

    for (let i = 0; i < pageLength; i++) {
      const listItem = (
        <li
          key={i}
          className={cx(
            `inline-block w-3 h-2px ml-1px ${
              currentPage === i ? 'bg-white' : 'bg-gray-800'
            }`
          )}
        ></li>
      );
      listItems.push(listItem);
    }

    return listItems;
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
}

export default useSlider;
