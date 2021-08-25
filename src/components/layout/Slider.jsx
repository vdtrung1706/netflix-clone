import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import SliderItem from '../common/SliderItem';
import useSlider from '../../hooks/useSlider';
import cx from 'classnames';
import {
  faChevronLeft,
  faChevronRight,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Slider = ({ title, selector }) => {
  const { loading, error, data: movies } = useSelector(selector);

  const ref = useRef();

  const { hasPre, hasNext, moveSection, distance, currentPage, totalPages } =
    useSlider(ref, movies);

  const paginationIndicator = () => {
    if (totalPages <= 0) return;

    return Array(Math.ceil(totalPages))
      .fill(0)
      .map((_, index) => {
        const className = cx(`inline-block w-3 h-2px ml-1px`, {
          'bg-white': currentPage == index,
          'bg-gray-800': currentPage != index,
        });

        return <li key={index} className={className}></li>;
      });
  };

  return (
    <section className="my-3 sm:my-4 xl:my-5 relative z-0 group hover:z-10">
      <a
        href="/"
        className="mx-4% mb-1 flex items-baseline cursor-pointer whitespace-nowrap w-max"
      >
        <h1 className="text-sm md:text-sm lg:text-base xl:text-xl font-bold">
          {title}
        </h1>
        <div className="text-xs font-bold flex items-baseline w-0 ml-1 opacity-0 transition-all group-hover:transform duration-300 delay-100 group-hover:w-auto group-hover:opacity-100 group-hover:translate-x-3">
          <span>Explore All</span>
          <span className="ml-2px">
            <FontAwesomeIcon icon={faChevronRight} />
          </span>
        </div>
      </a>

      <div className="ralative transition-transform duration-300 delay-100 ease-in-out">
        <div className="relative px-4%">
          {loading && <div>Loading...</div>}
          {error && <div>Error...</div>}
          {movies && (
            <>
              <ul className="-mt-4 mb-0 list-none absolute top-0 right-4% opacity-0 transition-all duration-300 delay-100 group-hover:opacity-100">
                {paginationIndicator()}
              </ul>

              <div className="overflow-x-visible">
                <div
                  style={{ transform: `translate3d(${distance}px, 0, 0)` }}
                  ref={ref}
                  className="whitespace-nowrap transform duration-300 ease-in-out delay-300"
                >
                  {movies.map(movie => {
                    return <SliderItem key={movie.id} movie={movie} />;
                  })}
                </div>
              </div>

              {hasNext && (
                <button
                  onClick={() => moveSection('RIGHT')}
                  className="opacity-0 group-hover:opacity-100 absolute top-0 bottom-0 right-0 z-20 w-4% text-center justify-center flex items-center bg-black bg-opacity-80 transition-all duration-300 delay-100 ease-in-out"
                >
                  <strong className="text-4xl">
                    <FontAwesomeIcon icon={faChevronRight} />
                  </strong>
                </button>
              )}

              {hasPre && (
                <button
                  onClick={() => moveSection('LEFT')}
                  className="opacity-0 group-hover:opacity-100 absolute top-0 bottom-0 left-0 z-20 w-4% text-center justify-center flex items-center bg-black bg-opacity-80 transition-all duration-300 delay-100 ease-in-out"
                >
                  <strong className="text-4xl">
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </strong>
                </button>
              )}

              {hasPre && hasNext === false ? (
                <button
                  onClick={() => moveSection('RESET')}
                  className="opacity-0 group-hover:opacity-100 absolute top-0 bottom-0 right-0 z-20 w-4% text-center justify-center flex items-center bg-black bg-opacity-80 transition-all duration-300 delay-100 ease-in-out"
                >
                  <strong className="text-4xl">
                    <FontAwesomeIcon icon={faUndo} />
                  </strong>
                </button>
              ) : null}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Slider;
