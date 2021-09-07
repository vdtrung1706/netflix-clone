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
  );
}

export default memo(SliderButtons);
