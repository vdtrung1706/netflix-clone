/* eslint-disable jsx-a11y/media-has-caption */
import {
  AddToMyListButton,
  MoreInfoButton,
  ToggleDislikedButton,
  ToggleLikedButton,
  ToggleSoundButton,
} from '@components/buttons';
import usePreviewPopper from '@hooks/usePreviewPopper';
import { Popper } from '@material-ui/core';
import { IMAGE_BASE } from '@services/axios.service';
import { selectCurrentUser } from '@store/auth/selectors.auth';
import { selectPlayer } from '@store/player/selectors.player';
import cx from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import DetailModal from './DetailModal';
import PreviewPopperTip from './PreviewPopperTip';

export default function PreviewPopper({
  movie,
  open,
  anchorEl,
  transformOrigin,
  handleClose,
  inMyList,
  liked,
  disliked,
  toggleMyList,
  toggleLiked,
  toggleDisliked,
  toggleMuted,
}) {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const videoTimeout = useRef(null);
  const [isBig, setIsBig] = useState(false);
  const [play, setPlay] = useState(false);
  const [visible, setVisible] = useState(true);
  const [onClosing, setOnClosing] = useState(false);

  const { muted } = useSelector(selectPlayer);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (!videoTimeout?.current) {
      videoTimeout.current = setTimeout(() => setPlay(true), 2500);
    }
    return () => {
      clearTimeout(videoTimeout.current);
    };
  }, []);

  const { previewVariants, getTranslateX } = usePreviewPopper(
    transformOrigin,
    anchorEl,
    ref.current,
  );

  const handlePreviewClose = useCallback(() => {
    if (isBig) return;
    setOnClosing(true);
    if (videoTimeout.current) clearTimeout(videoTimeout.current);
    videoTimeout.current = setTimeout(() => setPlay(false), 200);
    handleClose();
  }, [handleClose, isBig]);

  const handleModalClose = useCallback(() => {
    setIsBig(false);
    handleClose();
  }, [handleClose]);

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom"
      className={visible ? 'block' : 'hidden'}
      ref={ref}
    >
      <motion.div
        variants={previewVariants}
        exit="exit"
        initial="initial"
        animate="animate"
        onMouseLeave={handlePreviewClose}
        className="flex flex-col bg-black rounded-md cursor-pointer select-none w-350px box-shadow-full"
      >
        {/* Image Or Video */}
        <div className="relative w-full min-h-196.88px">
          {play ? (
            <>
              <video
                ref={videoRef}
                muted={muted}
                autoPlay
                disableRemotePlayback
                onEnded={() => setPlay(false)}
                src="https://imdb-video.media-imdb.com/vi270974489/1434659607842-pgv4ql-1592298111084.mp4?Expires=1631347822&Signature=hAusBjXPGwAyj7wU0xRh2jj42-uycJh40jS37Ee2Tw95EJk4sPWNS~-2poIsmExmbOo3biqCUofvTorytt1xN6bMMcYO~6Let9b7jMFnmxjs65UJX7Yu5iMunf~RekPXPAj4lNigrB400RgIDAKKY2nqCDqurLI3ko~~uGWKplZeK2LzhFIyIe4MmHWcF2Hz4tjWUiwH5KfeCFh3rXZRW1ojwVijUlI9U6ArdSkoW2ao7kEsO8pYZ6Zr4VeqH4RXr1nECdiebHJiKec1iGlkKGDIrjF6c8bzc2Lsue64P9qY62xOlLcNxnmx~cObXN5CIxbXi5VsolTgNtFk4FO9Ig__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA"
                className="object-cover object-center w-full h-full rounded-t-md"
              />
              <ToggleSoundButton
                muted={muted}
                onClick={toggleMuted}
                className="box-border absolute top-0 right-0 w-10 h-10 p-2 mx-4 mt-8 text-white duration-200 bg-white border border-solid rounded-full text-opacity-30 opacity-30 hover:text-opacity-100 bg-opacity-5 hover:opacity-100 border-grey hover:border-white trnasition-all"
              />
            </>
          ) : (
            <img
              src={`${IMAGE_BASE}/original${movie.backdrop_path}`}
              alt="small-preview-player"
              className={cx(
                'object-cover object-center rounded-t-md w-full h-full',
                {
                  'rounded-md': onClosing,
                },
              )}
            />
          )}
        </div>

        {/* Buttons */}
        <div className="p-4 cursor-pointer">
          <div className="flex items-center content-center justify-between align-middle">
            <div className="flex items-center content-center align-middle">
              <div className="box-border relative w-10 h-10 mr-2 text-black bg-white border border-white border-solid rounded-full p-7px hover:bg-white-hover">
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
                  onClick={() => toggleMyList(movie, currentUser.uid)}
                  className="box-border w-10 h-10 p-2 mr-2 duration-200 bg-white border border-solid rounded-full bg-opacity-5 border-grey hover:border-white trnasition-all"
                />
              </PreviewPopperTip>
              <PreviewPopperTip
                arrow
                placement="top"
                title={liked ? 'Rated' : 'I like this'}
              >
                <ToggleLikedButton
                  liked={liked}
                  onClick={() => toggleLiked(movie, currentUser.uid)}
                  className="box-border relative w-10 h-10 p-2 mr-2 text-white duration-200 bg-white border border-solid rounded-full bg-opacity-5 border-grey hover:border-white trnasition-all"
                />
              </PreviewPopperTip>
              <PreviewPopperTip
                arrow
                placement="top"
                title={disliked ? 'Rated' : 'Not for me'}
              >
                <ToggleDislikedButton
                  disliked={disliked}
                  onClick={() => toggleDisliked(movie, currentUser.uid)}
                  className="box-border relative w-10 h-10 p-2 mr-2 text-white duration-200 bg-white border border-solid rounded-full bg-opacity-5 border-grey hover:border-white trnasition-all"
                />
              </PreviewPopperTip>
            </div>
            <PreviewPopperTip arrow title="More info" placement="top">
              <MoreInfoButton
                onClick={() => setIsBig(true)}
                className="box-border relative w-10 h-10 p-1 duration-200 bg-white border border-solid rounded-full bg-opacity-5 border-grey hover:border-white trnasition-all"
              />
            </PreviewPopperTip>
          </div>

          {/* Info */}
          <div className="flex items-center content-center my-4 align-middle">
            <div className="font-semibold text-green">98% match</div>
            <div className="px-2 mx-2 leading-tight border border-white border-solid border-opacity-70">
              18+
            </div>
            <div className="">1h 42m</div>
            <div className="px-1 mx-2 text-0.7rem leading-tight border-opacity-70 font-light border border-white border-solid rounded">
              HD
            </div>
          </div>
          <div className="flex flex-wrap items-center content-center justify-start gap-1 my-4 text-center align-middle">
            <div className="my-1">Action</div>
            <span className="text-xs opacity-50">•</span>
            <div className="my-1">Drama</div>
            <span className="text-xs opacity-50">•</span>
            <div className="my-1">Thriller</div>
          </div>
        </div>

        {/* Show Big Modal */}
        <AnimatePresence>
          {isBig && (
            <DetailModal
              previewRef={ref}
              currentTime={videoRef.current ? videoRef.current.currentTime : 0}
              movie={movie}
              transformOrigin={transformOrigin}
              translateX={getTranslateX()}
              inMyList={inMyList}
              liked={liked}
              disliked={disliked}
              toggleDisliked={toggleDisliked}
              toggleLiked={toggleLiked}
              toggleMyList={toggleMyList}
              handleClose={handleModalClose}
              setPreviewVisible={setVisible}
              toggleMuted={toggleMuted}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </Popper>
  );
}
