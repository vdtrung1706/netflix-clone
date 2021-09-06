import { PreviewPopper } from '@components/common';
import useVisibility from '@hooks/useVisibility';
import cx from 'classnames';
import { useRef, useState } from 'react';
import BoxArt from './BoxArt';

export default function SliderItem({
  movie,
  large,
  onHover,
  transformOrigin,
  inSearchPage,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [inViewport, setInViewport] = useState(false);
  const [zIndex, setZIndex] = useState(10);
  const popperRef = useRef(null);
  const timeoutOpenRef = useRef(null);
  const ref = useRef(null);
  const open = Boolean(anchorEl && !large && inViewport);

  useVisibility(
    ref,
    () => setInViewport(true),
    () => setInViewport(false),
  );

  const handleMouseEnter = (event) => {
    event.preventDefault();
    if (!inViewport) return;

    onHover(event);
    setTimeout(() => setZIndex(20), 200);

    popperRef.current = event.currentTarget;
    timeoutOpenRef.current = setTimeout(() => {
      if (popperRef.current && !open) setAnchorEl(popperRef.current);
    }, 700);
  };

  const handleMouseLeave = () => {
    setTimeout(() => setZIndex(0), 200);

    if (!timeoutOpenRef.current) return;
    clearTimeout(timeoutOpenRef.current);
  };

  const handlePopperClose = () => {
    setAnchorEl(null);
    popperRef.current = null;
  };

  return (
    <div
      ref={ref}
      data-id={movie.id}
      onMouseLeave={() => handleMouseLeave()}
      onMouseEnter={(event) => handleMouseEnter(event)}
      onMouseOver={() => setTimeout(() => setZIndex(15), 100)}
      onFocus={() => setTimeout(() => setZIndex(15), 100)}
      style={{
        zIndex,
      }}
      className={cx(
        'relative cursor-pointer inline-block box-border align-top overflow-hidden',
        'px-2px h-full min-w-1/2 sm:min-w-1/3 lg:min-w-1/4 xl:min-w-1/5 2xl:min-w-1/6',
        'transition-all ease-in-out duration-700',
        `hover:origin-${transformOrigin}`,
        {
          'my-6': inSearchPage,
          onScreen: inViewport,
          'hover:transform hover:scale-x-115 hover:scale-y-110 lg:hover:scale-y-115':
            large && inViewport,
        },
      )}
    >
      <BoxArt movie={movie} large={large} />

      <PreviewPopper
        movie={movie}
        open={open}
        handleClose={handlePopperClose}
        anchorEl={anchorEl}
        transformOrigin={transformOrigin}
      />
    </div>
  );
}
