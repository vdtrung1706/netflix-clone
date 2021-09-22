/* eslint-disable jsx-a11y/media-has-caption */
import AddToMyListButton from '@components/buttons/AddToMyListButton';
import MoreInfoButton from '@components/buttons/MoreInfoButton';
import ToggleDislikedButton from '@components/buttons/ToggleDislikedButton';
import ToggleLikedButton from '@components/buttons/ToggleLikedButton';
import ToggleSoundButton from '@components/buttons/ToggleSoundButton';
import usePreviewPopper from '@hooks/usePreviewPopper';
import Popper from '@mui/material/Popper';
import { IMAGE_BASE } from '@services/axios.service';
import cx from 'classnames';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import PreviewPopperTip from './PreviewPopperTip';

export default function PreviewPopper({
  movie,
  genres,
  runtime,
  anchorEl,
  muted,
  playedTimeRef,
  videoSrc,
  origin,
  inMyList,
  liked,
  disliked,
  toggleMyList,
  toggleLiked,
  toggleDisliked,
  toggleMuted,
  handleMoreInfo,
  handleClose,
}) {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const videoTimeout = useRef(null);
  const [played, setPlayed] = useState(false);
  const { previewVariants, translateX } = usePreviewPopper(origin, anchorEl);
  useEffect(() => {
    if (!videoTimeout.current && playedTimeRef.current === 0) {
      videoTimeout.current = setTimeout(() => setPlayed(true), 2500);
    }
    return () => {
      if (videoTimeout.current) clearTimeout(videoTimeout.current);
    };
  }, [playedTimeRef, translateX]);

  const handlePreviewClose = useCallback(() => {
    if (videoTimeout.current) clearTimeout(videoTimeout.current);
    playedTimeRef.current = videoRef?.current?.currentTime + 0.6 || 0;
    setPlayed(false);
    handleClose();
  }, [playedTimeRef, handleClose]);

  const showMoreInfo = useCallback(() => {
    handlePreviewClose();
    handleMoreInfo();
  }, [handlePreviewClose, handleMoreInfo]);

  const handleVideoMounted = useCallback(
    (element) => {
      if (element) {
        videoRef.current = element;
        element.currentTime = playedTimeRef.current;
      }
    },
    [playedTimeRef],
  );

  return (
    <Popper
      open={true}
      anchorEl={anchorEl}
      placement="bottom"
      ref={ref}
      className="z-1000"
    >
      <motion.div
        variants={previewVariants}
        exit="exit"
        initial="initial"
        animate="animate"
        onMouseLeave={handlePreviewClose}
        className="flex flex-col bg-black rounded-md cursor-pointer select-none w-350px box-shadow-full"
      >
        {/* START OF PREVIEW PLAYER */}
        <div className="relative w-full h-48">
          {played || playedTimeRef.current > 0 ? (
            <>
              <video
                ref={handleVideoMounted}
                muted={muted}
                autoPlay
                disableRemotePlayback
                onEnded={() => setPlayed(false)}
                onError={() => setPlayed(false)}
                src={videoSrc}
                className="absolute top-0 bottom-0 left-0 right-0 object-cover object-center w-full h-full rounded-t-md"
              />
              <ToggleSoundButton
                muted={muted}
                onClick={toggleMuted}
                className="box-border absolute bottom-0 right-0 p-2 m-4 text-white text-opacity-50 transition-all duration-200 bg-white border border-solid rounded-full opacity-50 w-9 h-9 hover:text-opacity-100 bg-opacity-5 hover:opacity-100 border-grey hover:border-white"
              />
            </>
          ) : (
            <img
              src={`${IMAGE_BASE}/w400${movie.backdrop_path}`}
              alt="small-preview-player"
              className={cx(
                'absolute top-0 bottom-0 left-0 right-0 object-cover object-center rounded-t-md w-full h-full',
              )}
            />
          )}
        </div>
        {/* END OF PREVIEW PLAYER */}

        {/* START PREVIEW BUTTONS */}
        <div className="p-4 cursor-pointer">
          <div className="flex items-center content-center justify-between align-middle">
            <div className="flex items-center content-center align-middle">
              <div className="box-border relative mr-2 text-black bg-white border border-white border-solid rounded-full w-9 h-9 p-7px hover:bg-white-hover">
                <svg viewBox="0 0 24 24">
                  <path d="M6 4l15 8-15 8z" fill="currentColor"></path>
                </svg>
              </div>
              <PreviewPopperTip
                arrow
                placement="top"
                title={inMyList ? 'Remove from My List' : 'Add to My List'}
              >
                <AddToMyListButton
                  inMyList={inMyList}
                  onClick={() => toggleMyList(movie)}
                  className="box-border p-2 mr-2 transition-all duration-200 bg-white border border-solid rounded-full w-9 h-9 bg-opacity-5 border-grey hover:border-white"
                />
              </PreviewPopperTip>
              <PreviewPopperTip
                arrow
                placement="top"
                title={liked ? 'Rated' : 'I like this'}
              >
                <ToggleLikedButton
                  liked={liked}
                  onClick={() => toggleLiked(movie)}
                  className="box-border relative p-2 mr-2 text-white transition-all duration-200 bg-white border border-solid rounded-full w-9 h-9 bg-opacity-5 border-grey hover:border-white"
                />
              </PreviewPopperTip>
              <PreviewPopperTip
                arrow
                placement="top"
                title={disliked ? 'Rated' : 'Not for me'}
              >
                <ToggleDislikedButton
                  disliked={disliked}
                  onClick={() => toggleDisliked(movie)}
                  className="box-border relative p-2 mr-2 text-white transition-all duration-200 bg-white border border-solid rounded-full w-9 h-9 bg-opacity-5 border-grey hover:border-white"
                />
              </PreviewPopperTip>
            </div>
            <PreviewPopperTip arrow title="More info" placement="top">
              <MoreInfoButton
                onClick={() => showMoreInfo()}
                className="box-border relative p-2 transition-all duration-200 bg-white border border-solid rounded-full w-9 h-9 bg-opacity-5 border-grey hover:border-white"
              />
            </PreviewPopperTip>
          </div>
          {/* END OF PREVIEW BUTTONS */}

          {/* START OF PREVIEW INFO */}
          <div className="flex items-center content-center my-4 align-middle">
            <div className="font-semibold text-green">
              {Math.round(movie.vote_average * 10)}% Match
            </div>
            <div className="px-2 mx-2 leading-tight border border-white border-solid border-opacity-70">
              18+
            </div>
            <div>{`${parseInt(runtime / 60)}h${runtime % 60}m`}</div>
            <div className="px-1 mx-2 text-0.7rem leading-tight border-opacity-70 font-light border border-white border-solid rounded">
              HD
            </div>
          </div>
          <div className="flex flex-wrap items-center content-center justify-start gap-1 my-4 text-sm font-light text-center align-middle">
            {genres.map((genre, idx) => {
              if (idx === 0) {
                return (
                  <div key={genre.id} className="my-1">
                    {genre.name}
                  </div>
                );
              } else {
                return (
                  <div key={genre.id}>
                    <span className="text-xs opacity-50">•</span>
                    <span className="my-1 ml-1">{genre.name}</span>
                  </div>
                );
              }
            })}
          </div>
          {/* END OF PREVIEW INFO */}
        </div>
      </motion.div>
    </Popper>
  );
}
