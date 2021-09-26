import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ReplayIcon from '@mui/icons-material/Replay';
import { memo } from 'react';

function SliderButtons({ hasPre, hasNext, moveSection }) {
  return (
    <>
      {hasNext && (
        <button
          onClick={() => moveSection('RIGHT')}
          className="slider-btn hidden sm:flex opacity-0 absolute rounded-l top-0 bottom-0 right-0 z-20 w-4% text-center justify-center items-center bg-black-pure bg-opacity-40 transition-all duration-25 hover:bg-opacity-60"
        >
          <span className="text-xl lg:text-2xl">
            <ArrowForwardIosIcon fontSize="inherit" />
          </span>
        </button>
      )}

      {hasPre && (
        <button
          onClick={() => moveSection('LEFT')}
          className="slider-btn hidden sm:flex rounded-r opacity-0 absolute top-0 bottom-0 -left-2px z-20 w-4% text-center justify-center items-center bg-black-pure bg-opacity-40 transition-all duration-25 hover:bg-opacity-60"
        >
          <span className="text-xl transition-transform duration-100 ease-linear transform lg:text-2xl hover:scale-120">
            <ArrowBackIosIcon fontSize="inherit" />
          </span>
        </button>
      )}

      {hasPre && hasNext === false ? (
        <button
          onClick={() => moveSection('RESET')}
          className="slider-btn hidden sm:flex opacity-0 rounded-l absolute top-0 bottom-0 right-0 z-20 w-4% text-center justify-center items-center bg-black-pure bg-opacity-40 transition-all duration-25 hover:bg-opacity-60"
        >
          <span className="text-xl transition-transform duration-100 ease-linear transform lg:text-2xl hover:scale-120">
            <ReplayIcon fontSize="inherit" />
          </span>
        </button>
      ) : null}
    </>
  );
}

export default memo(SliderButtons);
