import { useEffect, useState } from 'react';
import useFetch from './use-fetch';
import cx from 'classnames';

function useSlider(windowWidth, containerRef, url) {
  const [movies] = useFetch(url);

  // to calculate does the slider have next or pre item
  const [viewed, setViewed] = useState(0);

  // to slide by distance
  const [distance, setDistance] = useState(0);

  const [containerWidth, setContainerWidth] = useState(0);
  const [totalInViewport, setTotalInViewport] = useState(0);

  // slider status
  const [sliderIndex, setSliderIndex] = useState(0);
  const [sliderPages, setSliderPages] = useState(0);

  const hasPrev = distance < 0;
  const hasNext = viewed + totalInViewport < movies.length;

  useEffect(() => {
    if (containerRef.current && containerRef.current.firstChild && movies) {
      const containerEl = containerRef.current;
      const containerWidth = containerEl.clientWidth;
      const itemWidth = containerEl.firstChild?.clientWidth;
      const totalInViewport = Math.ceil(containerWidth / itemWidth);
      setContainerWidth(containerWidth);
      setTotalInViewport(totalInViewport);
      setSliderPages(movies.length / totalInViewport);
    }
  }, [containerRef, movies, url, windowWidth]);

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

  const paginationIndicator = pageLength => {
    var listItems = [];

    for (let i = 0; i < pageLength; i++) {
      const listItem = (
        <li
          key={i}
          className={cx(
            `inline-block w-3 h-2px ml-1px ${
              sliderIndex === i ? 'bg-white' : 'bg-gray-800'
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
    hasPrev,
    sliderPages,
    movies,
    distance,
    sliderIndex,
    moveSection,
    paginationIndicator,
  };
}

export default useSlider;
