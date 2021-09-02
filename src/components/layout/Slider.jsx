import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SliderItem from '../common/SliderItem';
import useSlider from '../../hooks/useSlider';
import {
  faChevronLeft,
  faChevronRight,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import useViewport from '../../hooks/useViewport';
import { defaultFadeInVariants } from '../../utils/motionUtils';

export default function Slider({ title, selector }) {
  const ref = useRef();
  const { width } = useViewport();
  const { loading, error, data: movies } = useSelector(selector);
  const { hasPre, hasNext, moveSection, distance, paginationIndicator } =
    useSlider(ref, movies, width);

  useEffect(() => {}, [width]);

  return (
    <motion.section
      variants={defaultFadeInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="my-3 sm:my-4 xl:my-5 relative z-0 group hover:z-10"
    >
      <a
        href="/browse?genre=111"
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
          {error && <div>Error...</div>}
          {!loading && movies.length > 0 && (
            <>
              <ul className="-mt-4 mb-0 list-none absolute top-0 right-4% opacity-0 transition-all duration-300 delay-100 group-hover:opacity-100">
                {paginationIndicator()}
              </ul>

              <div className="overflow-x-scroll sm:overflow-x-visible">
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
                  className="hidden sm:flex opacity-0 group-hover:opacity-100 absolute top-0 bottom-0 right-0 z-20 w-4% text-center justify-center items-center bg-black bg-opacity-80 transition-all duration-300 delay-100 ease-in-out"
                >
                  <strong className="text-2xl lg:text-3xl">
                    <FontAwesomeIcon icon={faChevronRight} />
                  </strong>
                </button>
              )}

              {hasPre && (
                <button
                  onClick={() => moveSection('LEFT')}
                  className="hidden sm:flex opacity-0 group-hover:opacity-100 absolute top-0 bottom-0 left-0 z-20 w-4% text-center justify-center items-center bg-black bg-opacity-80 transition-all duration-300 delay-100 ease-in-out"
                >
                  <strong className="text-2xl lg:text-3xl">
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </strong>
                </button>
              )}

              {hasPre && hasNext === false ? (
                <button
                  onClick={() => moveSection('RESET')}
                  className="hidden sm:flex opacity-0 group-hover:opacity-100 absolute top-0 bottom-0 right-0 z-20 w-4% text-center justify-center items-center bg-black bg-opacity-80 transition-all duration-300 delay-100 ease-in-out"
                >
                  <strong className="text-2xl lg:text-3xl">
                    <FontAwesomeIcon icon={faUndo} />
                  </strong>
                </button>
              ) : null}
            </>
          )}
        </div>
      </div>
    </motion.section>
  );
}
