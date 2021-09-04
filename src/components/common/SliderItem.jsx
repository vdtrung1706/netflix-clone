import { useRef, useState } from 'react';
import cx from 'classnames';
import BoxArt from './BoxArt';
import SliderItemPopper from './SliderItemPopper';

export default function SliderItem({ movie, large, inSearchPage }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const popperRef = useRef(null);
  const timeoutRef = useRef(null);
  const open = Boolean(anchorEl);

  const handlePopperOpen = event => {
    popperRef.current = event.currentTarget;

    timeoutRef.current = setTimeout(() => {
      if (popperRef.current) setAnchorEl(popperRef.current);
    }, 500);
  };

  const handlePopperClose = () => {
    setAnchorEl(null);
    popperRef.current = null;
  };

  return (
    <div
      onMouseLeave={() => clearTimeout(timeoutRef.current)}
      onMouseEnter={handlePopperOpen}
      className={cx(
        'relative z-10 overflow-hidden cursor-pointer inline-block box-border',
        'px-2px min-w-1/2 sm:min-w-1/3 md:min-w-1/4 h-full lg:min-w-1/5 2xl:min-w-1/6',
        'transform-gpu transition-transform ease-in-out',
        { 'my-6': inSearchPage }
      )}
    >
      <BoxArt movie={movie} large={large} />

      <SliderItemPopper
        movie={movie}
        open={open}
        handleClose={handlePopperClose}
        anchorEl={anchorEl}
      />
    </div>
  );
}
