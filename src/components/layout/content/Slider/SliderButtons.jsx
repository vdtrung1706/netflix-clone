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
          className="slider-btn hidden sm:flex opacity-0 absolute rounded-l top-0 bottom-0 -right-2px z-20 w-4% text-center justify-center items-center bg-black-pure bg-opacity-40 transition-all duration-25 hover:bg-opacity-60"
        >
          <span className="font-black transition-transform ease-linear transform lg:text-3xl duration-25 hover:scale-130">
            <ArrowForwardIosIcon fontSize="inherit" />
          </span>
        </button>
      )}

      {hasPre && (
        <button
          onClick={() => moveSection('LEFT')}
          className="slider-btn hidden sm:flex rounded-r opacity-0 absolute top-0 bottom-0 -left-2px z-20 w-4% text-center justify-center items-center bg-black-pure bg-opacity-40 transition-all duration-25 hover:bg-opacity-60"
        >
          <span className="font-black transition-transform ease-linear transform lg:text-3xl duration-25 hover:scale-130">
            <ArrowBackIosIcon fontSize="inherit" />
          </span>
        </button>
      )}

      {hasPre && hasNext === false ? (
        <button
          onClick={() => moveSection('RESET')}
          className="slider-btn hidden sm:flex opacity-0 rounded-l absolute top-0 bottom-0 -right-2px z-20 w-4% text-center justify-center items-center bg-black-pure bg-opacity-40 transition-all duration-25 hover:bg-opacity-60"
        >
          <span className="font-black transition-transform ease-linear transform lg:text-3xl duration-25 hover:scale-130">
            <ReplayIcon fontSize="inherit" />
          </span>
        </button>
      ) : null}
    </>
  );
}

export default memo(SliderButtons);
