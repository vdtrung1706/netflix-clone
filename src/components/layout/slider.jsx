import React, { useRef } from 'react';
import useSlider from '../../hooks/use-slider';
import useViewport from '../../hooks/use-viewport';
import SliderItem from '../common/slider-item';
import cx from 'classnames';

import {
  faChevronLeft,
  faChevronRight,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Slider({ title, url }) {
  return (
    <section className="my-3 sm:my-4 xl:my-5 relative z-0 group hover:z-10">
      <SliderHeader title={title} />
      <SliderContainer url={url} />
    </section>
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

function SliderContainer({ url }) {
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

  return (
    <div className="ralative transition-transform duration-300 delay-100 ease-in-out">
      <div className="relative px-4%">
        <SliderPages
          sliderIndex={sliderIndex}
          sliderPages={sliderPages}
          paginationIndicator={paginationIndicator}
        />

        {/* Slider Items */}
        <div className="overflow-x-visible">
          <div
            className="whitespace-nowrap transform duration-300 ease-in-out delay-300"
            style={{ transform: `translate3d(${distance}px, 0, 0)` }}
            ref={ref}
          >
            {movies
              ? movies.map(movie => {
                  return <SliderItem key={movie.id} movie={movie} />;
                })
              : null}
          </div>
        </div>

        {/* Action Buttons */}
        <SliderButtons
          hasPrev={hasPrev}
          hasNext={hasNext}
          moveSection={moveSection}
        />
      </div>
    </div>
  );
}

function SliderPages({ sliderPages, paginationIndicator, sliderIndex }) {
  return (
    <ul className="-mt-4 mb-0 list-none absolute top-0 right-4% opacity-0 transition-all duration-300 delay-100 group-hover:opacity-100">
      {sliderPages > 0 ? paginationIndicator(sliderPages, sliderIndex) : null}
    </ul>
  );
}

function SliderButtons({ hasPrev, hasNext, moveSection }) {
  return (
    <>
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
    </>
  );
}

export default Slider;
