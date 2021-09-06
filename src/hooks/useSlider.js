import cx from 'classnames';
import { useEffect, useRef, useState } from 'react';

const useSlider = (ref, movies = [], width) => {
  const itemsRef = useRef(null);
  const [itemsProps, setItemProps] = useState(
    movies.map((movie) => ({
      movie,
      transformOrigin: 'center',
    })),
  );
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

      itemsRef.current = ref.current.children;
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

  const onScreen = (element) => {
    if (!element) return false;
    return element.className.includes('onScreen');
  };

  const onHover = (event) => {
    if (!itemsRef) return;

    const index = Object.entries(itemsRef.current).findIndex(
      (item) => item[1] === event.currentTarget,
    );

    const id = itemsRef.current[index].dataset.id;
    const itemPropsHover = itemsProps.filter((item) => item.movie.id == id)[0];

    if (!itemPropsHover) return;

    const hasPreOnScreen = onScreen(itemsRef.current[index - 1]);
    const hasNextOnScreen = onScreen(itemsRef.current[index + 1]);

    // middle => transform origin = "center"
    if (hasPreOnScreen && hasNextOnScreen) {
      setItemProps((pre) => {
        const newState = pre.map((item) => {
          if (item.movie.id === itemPropsHover.movie.id) {
            return {
              ...item,
              transformOrigin: 'center',
            };
          }
          return { ...item };
        });

        return newState;
      });
    } else if (hasNextOnScreen) {
      // first
      setItemProps((pre) => {
        const newState = pre.map((item) => {
          if (item.movie.id === itemPropsHover.movie.id) {
            return {
              ...item,
              transformOrigin: 'left',
            };
          }
          return { ...item };
        });
        return newState;
      });
    } else {
      // last
      setItemProps((pre) => {
        const newState = pre.map((item) => {
          if (item.movie.id === itemPropsHover.movie.id) {
            return {
              ...item,
              transformOrigin: 'right',
            };
          }
          return { ...item };
        });
        return newState;
      });
    }
  };

  return {
    hasNext,
    hasPre,
    totalPages,
    distance,
    currentPage,
    moveSection,
    paginationIndicator,
    onHover,
    itemsProps,
  };
};

export default useSlider;
