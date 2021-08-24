import React, { useEffect, useRef } from 'react';
import useViewport from '../../../hooks/use-viewport';
import SliderItem from './slider-item';
import cx from 'classnames';

import {
  faChevronLeft,
  faChevronRight,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import axios from '../../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { sliderSlice } from '../../../store/slider/sliderSlice';

function Slider({ title, url }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovies = async url => {
      const response = await axios.get(url);
      const movies = await response.data.results;
      dispatch(sliderSlice.actions.setMovies(movies));
    };

    fetchMovies(url);
  }, [dispatch, url]);

  return (
    <section className="my-3 sm:my-4 xl:my-5 relative z-0 group hover:z-10">
      <SliderHeader title={title} />
      <SliderContainer />
    </section>
  );
}

function SliderContainer() {
  const ref = useRef();
  const { width } = useViewport();
  const dispatch = useDispatch();

  const slider = useSelector(state => state.slider);

  useEffect(() => {
    dispatch(
      sliderSlice.actions.setContainerWidth({
        containerWidth: ref.current?.clientWidth || 0,
        itemWidth: ref.current?.firstChild?.clientWidth || 0,
      })
    );
  }, [dispatch, width, slider.movies]);

  return (
    <div className="ralative transition-transform duration-300 delay-100 ease-in-out">
      <div className="relative px-4%">
        <SliderPages
          sliderIndex={slider.currentPage}
          sliderPages={slider.totalPages}
        />

        <div className="overflow-x-visible">
          <div
            className="whitespace-nowrap transform duration-300 ease-in-out delay-300"
            style={{ transform: `translate3d(${slider.distance}px, 0, 0)` }}
            ref={ref}
          >
            {slider.movies.map(movie => {
              return <SliderItem key={movie.id} movie={movie} />;
            })}
          </div>
        </div>

        <SliderButtons hasPrev={slider.hasPre} hasNext={slider.hasNext} />
      </div>
    </div>
  );
}

function SliderPages({ sliderPages, sliderIndex }) {
  const paginationIndicator = (pageLength, sliderIndex) => {
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

  return (
    <ul className="-mt-4 mb-0 list-none absolute top-0 right-4% opacity-0 transition-all duration-300 delay-100 group-hover:opacity-100">
      {sliderPages > 0 ? paginationIndicator(sliderPages, sliderIndex) : null}
    </ul>
  );
}

function SliderButtons({ hasPrev, hasNext }) {
  const dispatch = useDispatch();

  return (
    <>
      {hasNext && (
        <button
          className={cx(
            'opacity-0 group-hover:opacity-100 absolute top-0 bottom-0 right-0 z-20 w-4% text-center justify-center flex items-center bg-black bg-opacity-80 transition-all duration-300 delay-100 ease-in-out'
          )}
          onClick={() => dispatch(sliderSlice.actions.moveSection('RIGHT'))}
        >
          <strong className="text-4xl">
            <FontAwesomeIcon icon={faChevronRight} />
          </strong>
        </button>
      )}

      {hasPrev && (
        <button
          className={cx(
            'opacity-0 group-hover:opacity-100 absolute top-0 bottom-0 left-0 z-20 w-4% text-center justify-center flex items-center bg-black bg-opacity-80 transition-all duration-300 delay-100 ease-in-out'
          )}
          onClick={() => dispatch(sliderSlice.actions.moveSection('LEFT'))}
        >
          <strong className="text-4xl">
            <FontAwesomeIcon icon={faChevronLeft} />
          </strong>
        </button>
      )}

      {hasPrev && hasNext === false ? (
        <button
          className="opacity-0 group-hover:opacity-100 absolute top-0 bottom-0 right-0 z-20 w-4% text-center justify-center flex items-center bg-black bg-opacity-80 transition-all duration-300 delay-100 ease-in-out"
          onClick={() => dispatch(sliderSlice.actions.moveSection('RESET'))}
        >
          <strong className="text-4xl">
            <FontAwesomeIcon icon={faUndo} />
          </strong>
        </button>
      ) : null}
    </>
  );
}

function SliderHeader({ title }) {
  return (
    <div>
      <a
        className="mx-4% mb-1 flex items-baseline cursor-pointer whitespace-nowrap w-max"
        href="/"
      >
        {/* title */}
        <div className="text-sm md:text-sm lg:text-base xl:text-xl font-bold">
          {title}
        </div>

        {/* Explore more */}
        <div className="text-xs font-bold flex items-baseline w-0 ml-1 opacity-0 transition-all group-hover:transform duration-300 delay-100 group-hover:w-auto group-hover:opacity-100 group-hover:translate-x-3">
          <div>Explore All</div>
          <div className="ml-2px">
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
      </a>
    </div>
  );
}

export default Slider;
