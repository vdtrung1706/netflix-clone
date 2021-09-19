import AddToMyListButton from '@components/buttons/AddToMyListButton';
import MoreInfoButton from '@components/buttons/MoreInfoButton';
import DetailModal from '@components/common/DetailModal';
import PreviewPopper from '@components/common/PreviewPopper';
import useFetch from '@hooks/useFetch';
import useSliderItem from '@hooks/useSliderItem';
import useViewport from '@hooks/useViewport';
import useVisibility from '@hooks/useVisibility';
import { getMovieInfoUrl, getTVShowInfoUrl } from '@services/requests.service';
import { getBoundingClientRect } from '@utils/convertor.utils';
import cx from 'classnames';
import { AnimatePresence } from 'framer-motion';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import BoxArt from './BoxArt';

function SliderItem({ movie, large, inSearchPage, isMovie }) {
  const ref = useRef(null);
  const openPreviewTimeout = useRef(null);
  const playTimeRef = useRef(0);
  const [inViewport, setInViewport] = useState(false);
  const [zIndex, setZIndex] = useState(10);
  const [largeHover, setLargeHover] = useState(false);
  const [origin, setOrigin] = useState('center');
  const [modalOpen, setModalOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const { width } = useViewport();
  const videoSrc =
    'https://movietrailers.apple.com/movies/fox/free-guy/free-guy-trailer-2_h1080p.mov';
  const {
    muted,
    inMyList,
    liked,
    disliked,
    toggleDisliked,
    toggleLiked,
    toggleMuted,
    toggleMyList,
  } = useSliderItem(movie);
  const {
    response: { data },
    loading,
    error,
  } = useFetch(
    isMovie ? getMovieInfoUrl(movie.id) : getTVShowInfoUrl(movie.id),
  );

  useEffect(() => {
    return () => {
      if (openPreviewTimeout.current) clearTimeout(openPreviewTimeout.current);
      playTimeRef.current = null;
    };
  }, []);

  useVisibility(
    ref,
    () => setInViewport(true),
    () => setInViewport(false),
  );

  const getOrgin = useCallback(
    (element) => {
      // padding 4% --> if left > width*3% ... --> origin left
      const { left, right, width: itemWidth } = getBoundingClientRect(element);
      const toLeft = width * 0.02;
      const toRight = width * 0.93;
      if (
        (left >= toLeft && left <= toLeft + itemWidth) ||
        (right >= toLeft && right <= toLeft + itemWidth)
      ) {
        return 'left';
      }
      if (right >= toRight || left >= toRight) {
        return 'right';
      }
      return 'center';
    },
    [width],
  );

  const handleMouseEnter = (event) => {
    event.preventDefault();
    if (!inViewport) {
      return;
    }
    setOrigin(getOrgin(event.currentTarget));
    if (large) {
      setZIndex(50);
      setLargeHover(true);
    } else {
      if (openPreviewTimeout.current) {
        clearTimeout(openPreviewTimeout.current);
      }
      openPreviewTimeout.current = setTimeout(() => {
        if (!modalOpen) {
          setPreviewOpen(true);
        }
      }, 1000);
    }
  };

  const handleMouseLeave = () => {
    if (large) {
      setLargeHover(false);
      setZIndex(0);
    } else {
      openPreviewTimeout.current && clearTimeout(openPreviewTimeout.current);
    }
  };

  const handlePreviewClose = () => {
    if (large) {
      setLargeHover(false);
      setZIndex(0);
    } else {
      setPreviewOpen(false);
      openPreviewTimeout.current && clearTimeout(openPreviewTimeout.current);
    }
  };

  const handleMoreInfo = () => {
    if (large) {
      setLargeHover(false);
      setZIndex(0);
    } else {
      setPreviewOpen(false);
    }
    setModalOpen(true);
  };

  const defaultGenres = [
    {
      id: Math.random(100),
      name: 'Action',
    },
    {
      id: Math.random(100),
      name: 'Thriller',
    },
  ];

  return (
    <div
      ref={ref}
      data-id={movie.id}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={(event) => handleMouseEnter(event)}
      style={{
        zIndex,
      }}
      className={cx(
        'relative cursor-pointer inline-block box-border align-top overflow-hidden',
        'px-2px h-full min-w-1/2 sm:min-w-1/3 lg:min-w-1/4 xl:min-w-1/6',
        'transition-all ease-in-out duration-700',
        `hover:origin-${origin}`,
        {
          'my-6': inSearchPage,
          'hover:transform hover:scale-125 md:hover:scale-117 lg:hover:scale-120 xl:hover:scale-125':
            large && inViewport,
        },
      )}
    >
      <BoxArt
        path={large ? movie.poster_path : movie.backdrop_path}
        title={movie.title || movie.name}
      />
      <AnimatePresence>
        {previewOpen && (
          <PreviewPopper
            key={1}
            movie={movie}
            genres={data?.genres || defaultGenres}
            runtime={data?.runtime || 112}
            muted={muted}
            playedTimeRef={playTimeRef}
            videoSrc={videoSrc}
            anchorEl={ref.current}
            origin={origin}
            inMyList={inMyList}
            liked={liked}
            disliked={disliked}
            handleClose={handlePreviewClose}
            toggleMyList={toggleMyList}
            toggleLiked={toggleLiked}
            toggleDisliked={toggleDisliked}
            toggleMuted={toggleMuted}
            handleMoreInfo={handleMoreInfo}
          />
        )}
        {modalOpen && !loading && (
          <DetailModal
            data={!error ? data : movie}
            key={2}
            muted={muted}
            playedTimeRef={playTimeRef}
            videoSrc={videoSrc}
            inMyList={inMyList}
            liked={liked}
            disliked={disliked}
            toggleDisliked={toggleDisliked}
            toggleLiked={toggleLiked}
            toggleMyList={toggleMyList}
            toggleMuted={toggleMuted}
            closeModal={() => setModalOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* START OF LARGE ITEMS */}
      {large && (
        <div
          className={cx('w-full transition-opacity duration-700', {
            'opacity-0': !largeHover,
            'opacity-100': largeHover,
          })}
        >
          <div className="absolute top-0 right-0 z-10">
            <button
              onClick={toggleMuted}
              className="w-8 h-8 p-2 m-2 text-white text-opacity-50 transition-all duration-200 border border-white border-opacity-50 border-solid rounded-full hover:bg-white hover:bg-opacity-5"
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
              <div className="flex items-center">
                <button className="box-border relative w-8 h-8 mr-2 text-black bg-white border border-white border-solid rounded-full p-7px hover:bg-white-hover">
                  <svg viewBox="0 0 24 24">
                    <path d="M6 4l15 8-15 8z" fill="currentColor"></path>
                  </svg>
                </button>
                <AddToMyListButton
                  onClick={toggleMyList}
                  className="w-8 h-8 p-2 mr-2 transition-all duration-200 border border-white border-opacity-50 border-solid rounded-full hover:bg-white hover:bg-opacity-5"
                  inMyList={inMyList}
                />
              </div>
              <div>
                <MoreInfoButton
                  onClick={handleMoreInfo}
                  className="w-8 h-8 p-2 transition-all duration-200 rounded-full bg-grey bg-opacity-60 hover:bg-grey-darker hover:bg-opacity-60"
                />
              </div>
            </div>
            <div className="text-base font-bold">
              {movie.title || movie.name}
            </div>
            <div className="flex items-center justify-start w-full text-xs">
              <div className="font-semibold text-green">
                {Math.round(movie.vote_average * 10)}% Match
              </div>
              <div className="px-1 mx-2 leading-tight border border-white border-opacity-50 border-solid">
                {movie.adult ? '18+' : '16+'}
              </div>
              <div>1 season</div>
            </div>
            <div className="flex flex-wrap items-center justify-start gap-1 mb-2 text-0.7rem">
              {data?.genres.slice(0, 3).map((genre, idx) => {
                if (idx === 0) {
                  return (
                    <div key={genre.id} className="my-1">
                      {genre.name}
                    </div>
                  );
                } else {
                  return (
                    <div key={genre.id}>
                      <span className="opacity-70 text-0.7rem">•</span>
                      <span className="my-1 ml-1">{genre.name}</span>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 z-0 rounded mx-2px opacity-70 h-44 bg-gradient-to-t from-black-pure"></div>
        </div>
      )}
      {/* END OF LARGE ITEMS */}
    </div>
  );
}

export default memo(SliderItem);
