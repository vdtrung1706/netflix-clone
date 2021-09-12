import {
  faChevronLeft,
  faChevronRight,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

function SliderButtons({ hasPre, hasNext, moveSection }) {
  return (
    <>
      {hasNext && (
        <button
          onClick={() => moveSection('RIGHT')}
          className="slider-btn hidden sm:flex opacity-0 absolute top-0 bottom-0 right-0 z-20 w-4% text-center justify-center items-center bg-black-pure bg-opacity-40 transition-all duration-25 hover:bg-opacity-75"
        >
          <strong className="transition-all duration-25 lg:text-xl">
            <FontAwesomeIcon icon={faChevronRight} />
          </strong>
        </button>
      )}

      {hasPre && (
        <button
          onClick={() => moveSection('LEFT')}
          className="slider-btn hidden sm:flex opacity-0 absolute top-0 bottom-0 left-0 z-20 w-4% text-center justify-center items-center bg-black-pure bg-opacity-40 transition-all duration-25 hover:bg-opacity-75"
        >
          <strong className="transition-all duration-25 lg:text-xl">
            <FontAwesomeIcon icon={faChevronLeft} />
          </strong>
        </button>
      )}

      {hasPre && hasNext === false ? (
        <button
          onClick={() => moveSection('RESET')}
          className="slider-btn hidden sm:flex opacity-0 absolute top-0 bottom-0 right-0 z-20 w-4% text-center justify-center items-center bg-black-pure bg-opacity-40 transition-all duration-25 hover:bg-opacity-75"
        >
          <strong className="transition-all duration-25 lg:text-xl">
            <FontAwesomeIcon icon={faUndo} />
          </strong>
        </button>
      ) : null}
    </>
  );
}

export default memo(SliderButtons);
