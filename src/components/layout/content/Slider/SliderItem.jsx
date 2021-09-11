import { PreviewPopper } from '@components/common';
import useVisibility from '@hooks/useVisibility';
import { selectCurrentUser } from '@store/auth/selectors.auth';
import { selectUserLists } from '@store/user-lists/selectors.user-lists';
import { userListsActions } from '@store/user-lists/slice.user-lists';
import { includeObjectById } from '@utils/array.utils';
import cx from 'classnames';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const [largeHover, setLargeHover] = useState(false);
  const ref = useRef(null);
  const popperRef = useRef(null);
  const timeoutOpenRef = useRef(null);
  let open = Boolean(anchorEl && !large && inViewport);
  const dispatch = useDispatch();
  const { myList } = useSelector(selectUserLists);
  const currentUser = useSelector(selectCurrentUser);
  var inMyList = includeObjectById(myList, movie.id);
  var muted = false;

  useEffect(() => {
    return () => {
      if (timeoutOpenRef.current) clearTimeout(timeoutOpenRef.current);
    };
  }, []);

  useVisibility(
    ref,
    () => setInViewport(true),
    () => setInViewport(false),
  );

  const handleMouseEnter = (event) => {
    event.preventDefault();
    if (!inViewport) return;
    if (large) setLargeHover(true);
    onHover(event);
    setZIndex(20);
    popperRef.current = event.currentTarget;
    if (timeoutOpenRef.current) {
      clearTimeout(timeoutOpenRef.current);
    }
    timeoutOpenRef.current = setTimeout(() => {
      if (popperRef && !open) {
        setAnchorEl(popperRef.current);
      }
    }, 700);
  };

  const handleMouseLeave = () => {
    setZIndex(0);
    if (large) setLargeHover(false);
    if (timeoutOpenRef.current) {
      clearTimeout(timeoutOpenRef.current);
    }
  };

  const handlePopperClose = () => {
    setAnchorEl(null);
    popperRef.current = null;
  };

  const hanldeMouseOver = () => {
    setZIndex(15);
  };

  const handleMouseOut = () => {
    setZIndex(0);
  };

  return (
    <div
      ref={ref}
      onMouseOver={hanldeMouseOver}
      onFocus={hanldeMouseOver}
      onMouseOut={handleMouseOut}
      onBlur={handleMouseOut}
      data-id={movie.id}
      onMouseLeave={() => handleMouseLeave()}
      onMouseEnter={(event) => handleMouseEnter(event)}
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
      <AnimatePresence>
        {open && (
          <PreviewPopper
            movie={movie}
            open={open}
            handleClose={handlePopperClose}
            anchorEl={anchorEl}
            transformOrigin={transformOrigin}
          />
        )}
      </AnimatePresence>
      {large && (
        <div
          className={cx('w-full transition-all duration-700', {
            'opacity-0': !largeHover,
            'opacity-100': largeHover,
          })}
        >
          <div className="absolute top-0 right-0">
            <button
              // onClick={() => dispatch(playerSlice.actions.toggleMuted())}
              className="absolute top-0 right-0 w-8 h-8 p-2 m-2 text-white text-opacity-50 transition-all duration-200 border border-white border-opacity-50 border-solid rounded-full hover:bg-white hover:bg-opacity-5"
            >
              <svg viewBox="0 0 24 24">
                {muted ? (
                  <path
                    d="M9 7.828L6.828 10H4v4h2.828L9 16.172V7.828zM11 21l-5-5H2V8h4l5-5v18zm6-10.414l3.293-3.293 1.414 1.414L18.414 12l3.293 3.293-1.414 1.414L17 13.414l-3.293 3.293-1.414-1.414L15.586 12l-3.293-3.293 1.414-1.414L17 10.586z"
                    fill="currentColor"
                  ></path>
                ) : (
                  <path
                    d="M9 7.828L6.828 10H4v4h2.828L9 16.172V7.828zM11 21l-5-5H2V8h4l5-5v18zm2.744-4.611l-1.414-1.414a4.161 4.161 0 0 0 0-5.885l1.414-1.414a6.161 6.161 0 0 1 0 8.713zm2.47 1.825L14.8 16.8a6.742 6.742 0 0 0 0-9.535l1.414-1.414a8.742 8.742 0 0 1 0 12.363zm2.47 1.825l-1.415-1.415a9.323 9.323 0 0 0 0-13.184l1.415-1.414c4.421 4.422 4.421 11.59 0 16.013z"
                    fill="currentColor"
                  ></path>
                )}
              </svg>
            </button>
          </div>

          <div className="absolute bottom-0 left-0 z-10 flex flex-col w-full px-2">
            <div className="flex items-center justify-between my-1">
              <div className="flex">
                <button
                  style={{ padding: '6px' }}
                  className="box-border relative w-8 h-8 mr-2 text-black bg-white border border-white border-solid rounded-full hover:bg-white-hover"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M6 4l15 8-15 8z" fill="currentColor"></path>
                  </svg>
                </button>
                <button
                  onClick={() =>
                    dispatch(
                      userListsActions.toggleMyList({
                        movie,
                        userId: currentUser.uid,
                      }),
                    )
                  }
                  className="w-8 h-8 p-2 mr-2 transition-all duration-200 border border-white border-opacity-50 border-solid rounded-full hover:bg-white hover:bg-opacity-5"
                >
                  <svg viewBox="0 0 24 24">
                    {inMyList ? (
                      <path
                        fill="currentColor"
                        d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"
                      ></path>
                    ) : (
                      <path
                        d="M13 11h8v2h-8v8h-2v-8H3v-2h8V3h2v8z"
                        fill="currentColor"
                      ></path>
                    )}
                  </svg>
                </button>
              </div>
              <div>
                <button
                  onClick={() => {}}
                  className="w-8 h-8 p-1 transition-all duration-200 rounded-full bg-grey bg-opacity-60 hover:bg-grey-darker hover:bg-opacity-60"
                >
                  <svg
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    className="w-full h-full stroke-current"
                  >
                    <path strokeWidth="4" d="M20 26l11.994 14L44 26"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="text-base font-bold">
              {movie.title || movie.name}
            </div>

            <div className="flex items-center justify-start w-full text-xs">
              <div className="font-semibold text-green">95% match</div>
              <div className="px-1 mx-2 leading-tight border border-white border-solid border-opacity-60">
                {movie.adult ? '18+' : '16+'}
              </div>
              <div className="">1 season</div>
            </div>

            <div className="flex flex-wrap items-center justify-start gap-1 mb-2 text-xs">
              <div className="my-1">Action</div>
              <span className="opacity-70 text-0.7rem">•</span>
              <div className="my-1">Drama</div>
              <span className="opacity-70 text-0.7rem">•</span>
              <div className="my-1">Thriller</div>
            </div>
          </div>
          <div className="absolute z-0 w-full h-36 -bottom-7 bg-gradient-to-t from-black-pure"></div>
        </div>
      )}
    </div>
  );
}
