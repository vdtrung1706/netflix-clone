import React, { useEffect, useRef } from 'react';
import useSlider from '../../hooks/useSlider';
import Slide from '../common/Slide';
import useViewport from '../../hooks/useViewport';
import cx from 'classnames';

import {
  faChevronLeft,
  faChevronRight,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Slider = ({ title, url }) => {
  const ref = useRef(null);
  const { width } = useViewport();

  const {
    moveSection,
    sliderPages,
    distance,
    hasPrev,
    hasNext,
    movies,
    sliderIndex,
    paginationIndicator,
  } = useSlider(width, ref, url);

  useEffect(() => {}, [width]);

  return (
    <section className="my-3 sm:my-4 xl:my-5 relative z-0 group hover:z-10">
      <div name="slider-header">
        <a
          className="mx-4% mb-1 flex items-baseline cursor-pointer whitespace-nowrap w-max"
          href={'/'}
        >
          <div className="text-sm md:text-sm lg:text-base xl:text-xl font-bold">
            {title}
          </div>
          <div className="text-xs font-bold flex items-baseline w-0 ml-1 opacity-0 transition-all group-hover:transform duration-300 delay-100 group-hover:w-auto group-hover:opacity-100 group-hover:translate-x-3">
            <div>Explore All</div>
            <div className="ml-2px">
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </div>
        </a>
      </div>

      <div
        name="slider-container"
        className="ralative transition-transform duration-300 delay-100 ease-in-out"
      >
        <div name="slider" className="relative px-4%">
          <ul
            name="pagination-indicator"
            className="-mt-6 mb-3 list-none absolute top-0 right-4% opacity-0 transition-all duration-300 delay-100 group-hover:opacity-100"
          >
            {sliderPages > 0
              ? paginationIndicator(sliderPages, sliderIndex)
              : null}
          </ul>

          <div className="overflow-x-visible">
            <div
              className="whitespace-nowrap transform duration-300 ease-in-out delay-300"
              style={{ transform: `translate3d(${distance}px, 0, 0)` }}
              ref={ref}
            >
              {movies
                ? movies.map(movie => {
                    return <Slide key={movie.id} movie={movie} />;
                  })
                : null}
            </div>
          </div>

          {hasNext && (
            <button
              className={cx(
                'opacity-0 group-hover:opacity-100 absolute top-0 bottom-0 right-0 z-20 w-4% text-center justify-center flex items-center bg-black bg-opacity-80 transition-all duration-300 delay-100 ease-in-out'
              )}
              onClick={() => moveSection('RIGHT')}
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
              onClick={() => moveSection('LEFT')}
            >
              <strong className="text-4xl">
                <FontAwesomeIcon icon={faChevronLeft} />
              </strong>
            </button>
          )}

          {hasPrev && hasNext === false ? (
            <button
              className="opacity-0 group-hover:opacity-100 absolute top-0 bottom-0 right-0 z-20 w-4% text-center justify-center flex items-center bg-black bg-opacity-80 transition-all duration-300 delay-100 ease-in-out"
              onClick={() => moveSection('RESET')}
            >
              <strong className="text-4xl">
                <FontAwesomeIcon icon={faUndo} />
              </strong>
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Slider;
