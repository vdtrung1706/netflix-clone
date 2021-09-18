/* eslint-disable jsx-a11y/media-has-caption */
import AddToMyListButton from '@components/buttons/AddToMyListButton';
import MoreInfoButton from '@components/buttons/MoreInfoButton';
import ToggleDislikedButton from '@components/buttons/ToggleDislikedButton';
import ToggleLikedButton from '@components/buttons/ToggleLikedButton';
import ToggleSoundButton from '@components/buttons/ToggleSoundButton';
import useViewport from '@hooks/useViewport';
import { Modal } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import { IMAGE_BASE } from '@services/axios.service';
import { randomIndex } from '@utils/array.utils';
import { truncate } from '@utils/convertor.utils';
import { modalVariants } from '@utils/motion.utils';
import cx from 'classnames';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import DetailPlayer from './DetailPlayer';
import PreviewPopperTip from './PreviewPopperTip';
import SimilarItems from './SimilarItems';

const DetailModal = ({
  data,
  muted,
  playedTimeRef,
  videoSrc,
  liked,
  inMyList,
  disliked,
  toggleDisliked,
  toggleLiked,
  toggleMyList,
  toggleMuted,
  closeModal,
}) => {
  const onTransitionTimeout = useRef(null);
  const playedTimeout = useRef(null);
  const [toggleMore, setToggleMore] = useState(false);
  const [onTransition, setOnTransition] = useState(true);
  const [played, setPlayed] = useState(false);
  const { width: windowWidth } = useViewport();

  const getModalSize = (windowWidth) => {
    if (windowWidth < 570) return { height: '95%', width: '96%' };
    if (windowWidth < 855) return { height: '95%', width: 560 };
    return { height: '95%', width: 850 };
  };

  const { width, height } = getModalSize(windowWidth);
  const mainModalStyle = useMemo(
    () => ({
      width,
      height,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      transform: `translate(${(windowWidth - width) / 2}px, 0)`,
    }),
    [height, width, windowWidth],
  );

  useEffect(() => {
    if (playedTimeRef.current > 0) {
      setPlayed(true);
    } else {
      playedTimeout.current = setTimeout(() => setPlayed(true), 2500);
    }

    onTransitionTimeout.current = setTimeout(() => setOnTransition(false), 700);
    return () => {
      if (playedTimeout.current) clearTimeout(playedTimeout.current);
      if (onTransitionTimeout.current)
        clearTimeout(onTransitionTimeout.current);
    };
  }, [playedTimeRef]);

  const handleClose = () => {
    setOnTransition(true);
    closeModal();
  };

  const logoSrc = useMemo(() => {
    if (!data) return null;
    const logos = data.images?.logos;
    if (logos?.length > 0) {
      return `${IMAGE_BASE}/w300${logos[0].file_path}`;
    }
    return null;
  }, [data]);

  const backgroundSrc = useMemo(() => {
    const backdrops = data.images?.backdrops;
    if (backdrops?.length > 0) {
      return `${IMAGE_BASE}/original${
        backdrops[randomIndex(backdrops.length)].file_path
      }`;
    }
    return `${IMAGE_BASE}/original${data.backdrop_path}`;
  }, [data]);

  return (
    <Modal
      open={true}
      onClose={handleClose}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 25 }}
      className="absolute block h-auto overflow-x-hidden overflow-y-scroll select-none"
    >
      <motion.div
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={`relative ${onTransition ? 'h-full' : ''}`}
      >
        <div
          style={{ ...mainModalStyle }}
          className="absolute mt-8 text-white rounded-md"
        >
          <div className="relative flex flex-col w-full rounded-md bg-black-light box-shadow-full">
            <div
              className={cx(
                'relative w-full border-b border-opacity-50 border-solid border-black-pure align-middle',
                {
                  'h-auto': windowWidth < 560,
                  'min-h-80': windowWidth < 855,
                  'min-h-120': windowWidth >= 855,
                },
              )}
            >
              {/* BEGIN OF PLAYER */}
              <DetailPlayer
                currentTime={playedTimeRef.current}
                muted={muted}
                videoSrc={videoSrc}
                backgroundSrc={backgroundSrc}
                played={played}
                onEnded={() => setPlayed(false)}
              />
              <div className="absolute bottom-0 left-0 z-20 w-full h-56 bg-repeat-x bg-gradient-to-t from-black-light"></div>
              <button
                onClick={handleClose}
                className="box-border absolute top-0 right-0 z-20 w-8 h-8 p-2 mx-4 mt-6 rounded-full bg-black-pure bg-opacity-80"
              >
                <svg viewBox="0 0 24 24" role="button">
                  <path
                    d="M12 10.586l7.293-7.293 1.414 1.414L13.414 12l7.293 7.293-1.414 1.414L12 13.414l-7.293 7.293-1.414-1.414L10.586 12 3.293 4.707l1.414-1.414L12 10.586z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
              <div className="absolute left-0 z-20 flex flex-col content-center justify-between w-full align-middle transition-opacity duration-500 bottom-10">
                <div className="w-1/2 my-4 ml-10 text-xl font-bold lg:text-2xl lg:w-5/12">
                  {logoSrc != null ? (
                    <img
                      src={logoSrc}
                      alt="movie_logo"
                      className="object-cover object-center rounded-t-md"
                    />
                  ) : (
                    <>{data.title || data.name || data.original_name}</>
                  )}
                </div>
                <div className="flex items-center content-center justify-between mx-10">
                  <div className="flex items-center content-center align-middle h-9">
                    <button className="flex items-center justify-center px-3 mr-2 text-black bg-white border border-white border-solid rounded lg:px-6 max-w-max hover:bg-white-hover">
                      <div className="box-border relative w-8 h-8 text-black p-7px">
                        <svg viewBox="0 0 24 24">
                          <path d="M6 4l15 8-15 8z" fill="currentColor"></path>
                        </svg>
                      </div>
                      <span className="mr-2 font-bold">Play</span>
                    </button>
                    <PreviewPopperTip
                      arrow
                      className="text-white"
                      title={
                        inMyList ? 'Remove from My List' : 'Add to My List'
                      }
                      placement="top"
                    >
                      <AddToMyListButton
                        inMyList={inMyList}
                        onClick={() => toggleMyList(data)}
                        className="box-border p-2 mr-2 transition-all duration-200 bg-black bg-opacity-50 border border-white border-solid rounded-full hover:bg-opacity-40 hover:bg-black-lighter w-9 h-9 border-opacity-70 hover:border-opacity-100"
                      />
                    </PreviewPopperTip>
                    <PreviewPopperTip
                      arrow
                      className="text-white"
                      title={liked ? 'Rated' : 'I like this'}
                      placement="top"
                    >
                      <ToggleLikedButton
                        liked={liked}
                        onClick={() => toggleLiked(data)}
                        className="box-border relative p-2 mr-2 text-white transition-all duration-200 bg-black bg-opacity-50 border border-white border-solid rounded-full hover:bg-opacity-40 hover:bg-black-lighter w-9 h-9 border-opacity-70 hover:border-opacity-100"
                      />
                    </PreviewPopperTip>
                    <PreviewPopperTip
                      arrow
                      className="text-white"
                      title={disliked ? 'Rated' : 'Not for me'}
                      placement="top"
                    >
                      <ToggleDislikedButton
                        disliked={disliked}
                        onClick={() => toggleDisliked(data)}
                        className="box-border relative p-2 mr-2 text-white transition-all duration-200 bg-black bg-opacity-50 border border-white border-solid rounded-full hover:bg-opacity-40 hover:bg-black-lighter w-9 h-9 border-opacity-70 hover:border-opacity-100"
                      />
                    </PreviewPopperTip>
                  </div>
                  <ToggleSoundButton
                    muted={muted}
                    onClick={toggleMuted}
                    className={cx(
                      'box-border p-2 transition-all duration-200 bg-black border border-white border-solid rounded-full opacity-40 bg-opacity-60 w-9 h-9 hover:opacity-100 border-opacity-70 hover:border-opacity-100',
                      { hidden: !played },
                    )}
                  />
                </div>
              </div>
            </div>
            {/* END OF PLAYER */}

            {/* BEGIN OF DESCRIPTION */}
            <div className="relative flex justify-between w-full my-3 transition-opacity duration-500">
              <div className="flex flex-col w-2/3 pl-10">
                <div className="flex flex-wrap items-center content-center text-sm">
                  <span className="mr-2 font-semibold text-green">
                    {Math.round(data.vote_average * 10)}% Match
                  </span>
                  <div className="flex items-center">
                    <span>{data.release_date?.split('-')?.[0] || null}</span>
                    <span className="px-2 mx-2 leading-tight border border-white border-opacity-50 border-solid">
                      18+
                    </span>
                    <div>
                      {data.runtime
                        ? `${parseInt(data.runtime / 60)}h${data.runtime % 60}m`
                        : '1h17m'}
                    </div>
                    <span className="px-1 mx-2 text-0.7rem font-light border border-white border-opacity-50 border-solid rounded leading-tight">
                      HD
                    </span>
                  </div>
                </div>
                <p className="mt-3 overflow-hidden text-base">
                  {truncate(data.overview, 140)}
                </p>
              </div>
              <div className="flex flex-col w-1/3 gap-4 px-10 text-xs">
                {data.credits ? (
                  <div className="break-words">
                    <span className="text-grey">Cast:</span>
                    {data.credits.cast.slice(0, 4).map((cast) => (
                      <span key={cast.cast_id} className="ml-1">
                        {cast.name || cast.original_name},
                      </span>
                    )) || null}
                    <span className="ml-1 hover:underline">more</span>
                  </div>
                ) : null}
                {data.genres ? (
                  <div className="break-normal">
                    <span className="text-grey">Genres:</span>
                    {data.genres.map((genre) => (
                      <span key={genre.id} className="ml-1">
                        {`${genre.name},`}
                      </span>
                    )) || null}
                    <span className="ml-1 hover:underline">more</span>
                  </div>
                ) : null}
                <div>
                  <span className="text-grey">This movie is: </span>
                  <span className="ml-1">Exciting</span>
                </div>
              </div>
            </div>
            {/* END OF DESCRIPTION */}

            {/* BEGIN OF MORE INFO */}
            {data.similar ? (
              <div className="px-10 py-5">
                <div className="relative">
                  <div className="pb-5 text-xl font-bold">More Like This</div>
                  <div
                    className={cx('grid w-full gap-4 ', {
                      'h-274 overflow-hidden': !toggleMore,
                      'pb-16': toggleMore,
                      'grid-cols-2': windowWidth < 855,
                      'grid-cols-3': windowWidth >= 855,
                    })}
                  >
                    <SimilarItems
                      movies={data.similar?.results || []}
                      toggleMyList={toggleMyList}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 z-50 h-px -mx-2 bg-black-light"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-px -mx-2 bg-white z-75 bg-opacity-10 "></div>
                  <div className="absolute bottom-0 left-0 right-0 z-50 h-12 -mx-2 bg-gradient-to-t from-black-light"></div>
                  <MoreInfoButton
                    isMore={toggleMore}
                    onClick={() => setToggleMore((pre) => !pre)}
                    className="box-border absolute left-0 right-0 w-8 h-8 mx-auto text-white transition-all duration-200 border border-white border-opacity-50 border-solid rounded-full p-7px hover:bg-white hover:bg-opacity-5 z-75 -bottom-4"
                  />
                </div>
                <div className="relative pt-10 pb-16 text-sm font-light">
                  <div className="pb-5 text-xl font-bold">
                    About {data.title || data.name}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-1">
                      <span className="text-grey-txt">Director:</span>
                      <span className="hover:underline">This Is Hihi</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1">
                      <span className="text-grey-txt">Cast:</span>
                      {data.credits.cast.map((cast) => (
                        <span key={cast.cast_id} className="hover:underline">
                          {cast.name || cast.original_name},
                        </span>
                      ))}
                      <span className="hover:underline">Trunpyon Vu</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1">
                      <span className="text-grey-txt">Writer:</span>
                      <span className="hover:underline">This Is HaHa</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1">
                      <span className="text-grey-txt">Grenes:</span>
                      {data.genres.map((genre) => (
                        <span key={genre.id} className="hover:underline">
                          {genre.name},
                        </span>
                      ))}
                      <span className="hover:underline">Comedies</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1">
                      <span className="text-grey-txt">This movie is:</span>
                      <span className="hover:underline">Adrenaline Rush,</span>
                      <span className="hover:underline">Groofy,</span>
                      <span className="hover:underline">Exciting</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1">
                      <span className="text-grey-txt">Maturity rating:</span>
                      <span className="px-2 mx-2 leading-tight border border-white border-opacity-50 border-solid">
                        {data.adult ? '18+' : '13+'}
                      </span>
                      <span className="hover:underline">
                        Recommemfor ages {data.adult ? '18' : '13'} and up
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-10 text-red">
                Loading more data errors. We truly sorry about this!
              </div>
            )}
            {/* END OF MORE INFO */}
          </div>
        </div>
      </motion.div>
    </Modal>
  );
};

export default DetailModal;
