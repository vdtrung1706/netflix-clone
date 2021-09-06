import {
  faChevronLeft,
  faChevronRight,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useSlider from '@hooks/useSlider';
import useViewport from '@hooks/useViewport';
import { defaultFadeInVariants } from '@utils/motion.utils';
import cx from 'classnames';
import { motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import SliderItem from './SliderItem';

export default function Slider({ title, selector, large }) {
  const ref = useRef();
  const { width } = useViewport();
  const { loading, error, data: movies } = useSelector(selector);
  const {
    hasPre,
    hasNext,
    moveSection,
    distance,
    paginationIndicator,
    onHover,
    itemsProps,
  } = useSlider(ref, movies, width);

  useEffect(() => {}, [width]);

  return (
    <motion.section
      variants={defaultFadeInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative w-full my-3vw group z-1"
    >
      <a
        href="/browse?genre=111"
        className="mx-4% px-1 mb-1 lg:mb-2 flex items-baseline cursor-pointer whitespace-nowrap w-max"
      >
        <h1 className="text-font-medium md:text-sm lg:text-base xl:text-xl">
          {title}
        </h1>
        <div className="flex items-baseline w-0 ml-1 text-xs font-medium transition-all duration-300 delay-100 opacity-0 group-hover:transform group-hover:w-auto group-hover:opacity-100 group-hover:translate-x-3">
          <span>Explore All</span>
          <span className="ml-2px">
            <FontAwesomeIcon icon={faChevronRight} />
          </span>
        </div>
      </a>

      <div className="relative transition-transform duration-300 ease-in-out delay-100 z-3">
        <div className="relative px-4% z-2">
          {error && <div>Error...</div>}
          {!loading && movies.length > 0 && (
            <>
              <ul className="-mt-4 px-1 mb-0 list-none absolute top-0 right-4% opacity-0 transition-all duration-300 delay-100 group-hover:opacity-100">
                {paginationIndicator()}
              </ul>

              <div className="overflow-x-scroll sm:overflow-x-visible">
                <div
                  style={{
                    transform: `translate3d(${distance}px, 0, 0)`,
                    height: large ? '31rem' : 'auto',
                  }}
                  ref={ref}
                  className={cx(
                    'flex flex-shrink-0 duration-300 ease-in-out delay-300 transform whitespace-nowrap',
                    { 'h-96 md:h-116 xl:h-31': large },
                  )}
                >
                  {itemsProps.map((item) => {
                    return (
                      <SliderItem
                        key={item.movie.id}
                        movie={item.movie}
                        translate={item.translate}
                        transformOrigin={item.transformOrigin}
                        onHover={onHover}
                        large={large}
                      />
                    );
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