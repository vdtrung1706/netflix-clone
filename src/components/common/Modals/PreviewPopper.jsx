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
import { getBoundingClientRect } from '@utils/convertor.utils';
import cx from 'classnames';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import PreviewPopperTip from './PreviewPopperTip';

export default function PreviewPopper({
  movie,
  anchorEl,
  muted,
  open,
  currentTimeRef,
  origin,
  handleClose,
  inMyList,
  liked,
  disliked,
  toggleMyList,
  toggleLiked,
  toggleDisliked,
  toggleMuted,
  setTranslateX,
  setPreviewRect,
  handleMoreInfo,
}) {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const videoTimeout = useRef(null);
  const [played, setPlayed] = useState(false);
  const { previewVariants, getTranslateX } = usePreviewPopper(origin, anchorEl);

  useEffect(() => {
    setTranslateX(getTranslateX());
    if (!videoTimeout.current && currentTimeRef.current === 0) {
      videoTimeout.current = setTimeout(() => setPlayed(true), 2000);
    }
    return () => {
      if (videoTimeout.current) clearTimeout(videoTimeout.current);
    };
  }, [currentTimeRef, getTranslateX, setTranslateX]);

  const handlePreviewClose = useCallback(() => {
    if (videoTimeout.current) clearTimeout(videoTimeout.current);
    videoTimeout.current = setTimeout(() => setPlayed(false), 100);
    currentTimeRef.current = videoRef?.current?.currentTime || 0;
    handleClose();
  }, [currentTimeRef, handleClose]);

  const showMoreInfo = useCallback(() => {
    if (videoTimeout.current) clearTimeout(videoTimeout.current);
    setPreviewRect(getBoundingClientRect(ref.current));
    currentTimeRef.current = videoRef?.current?.currentTime || 0;
    handleMoreInfo();
  }, [currentTimeRef, handleMoreInfo, setPreviewRect]);

  const handleVideoMounted = (element) => {
    if (element) {
      videoRef.current = element;
      element.currentTime = currentTimeRef.current;
    }
  };

  return (
    <Popper open={open} anchorEl={anchorEl} placement="bottom" ref={ref}>
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
          {played || currentTimeRef.current > 0 ? (
            <>
              <video
                ref={handleVideoMounted}
                muted={muted}
                autoPlay
                disableRemotePlayback
                onEnded={() => setPlayed(false)}
                src="https://imdb-video.media-imdb.com/vi394707225/1434659607842-pgv4ql-1602090193929.mp4?Expires=1631689266&Signature=cAY4zSXyvVSa2ugMC3camRPrhkPhrUlleJP41FXzJmi1XyHlwXMUcBecipoJqVGJn-0dQBOV~SSxxQKLKV5hUuLAanKb9mPtt4odGFgrViD2usUyqokZdGpNAhWNQitQhbuzM7S6JFniYMV-AHVhatneDuchL8kq-LdWOOnu~3-unePpYYF8UCiKbFpjxxjhWHTkFeYLtL08WW-gOndSBFft2NITpGW-zT9FjN4M0kuYGcpwwMq6BnlupBRlrkIAE5EYPoPAJldZAjXjSYhh22Ni5rIa-d2RcmmW2WAbi9shHiNxXiwP2v4K0AfFoFURuIpAATWHERlKL7KEPsuQ3g__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA"
                className="object-cover object-center w-full h-full rounded-t-md"
              />
              <ToggleSoundButton
                muted={muted}
                onClick={toggleMuted}
                className="box-border absolute top-0 right-0 w-10 h-10 p-2 mx-4 mt-8 text-white transition-all duration-200 bg-white border border-solid rounded-full text-opacity-40 opacity-40 hover:text-opacity-100 bg-opacity-5 hover:opacity-100 border-grey hover:border-white"
              />
            </>
          ) : (
            <motion.img
              src={`${IMAGE_BASE}/original${movie.backdrop_path}`}
              alt="small-preview-player"
              className={cx(
                'object-cover object-center rounded-t-md w-full h-full',
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
                  onClick={() => toggleMyList()}
                  className="box-border w-10 h-10 p-2 mr-2 transition-all duration-200 bg-white border border-solid rounded-full bg-opacity-5 border-grey hover:border-white"
                />
              </PreviewPopperTip>
              <PreviewPopperTip
                arrow
                placement="top"
                title={liked ? 'Rated' : 'I like this'}
              >
                <ToggleLikedButton
                  liked={liked}
                  onClick={toggleLiked}
                  className="box-border relative w-10 h-10 p-2 mr-2 text-white transition-all duration-200 bg-white border border-solid rounded-full bg-opacity-5 border-grey hover:border-white"
                />
              </PreviewPopperTip>
              <PreviewPopperTip
                arrow
                placement="top"
                title={disliked ? 'Rated' : 'Not for me'}
              >
                <ToggleDislikedButton
                  disliked={disliked}
                  onClick={toggleDisliked}
                  className="box-border relative w-10 h-10 p-2 mr-2 text-white transition-all duration-200 bg-white border border-solid rounded-full bg-opacity-5 border-grey hover:border-white"
                />
              </PreviewPopperTip>
            </div>
            <PreviewPopperTip arrow title="More info" placement="top">
              <MoreInfoButton
                onClick={() => showMoreInfo()}
                className="box-border relative w-10 h-10 p-1 transition-all duration-200 bg-white border border-solid rounded-full bg-opacity-5 border-grey hover:border-white"
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
      </motion.div>
    </Popper>
  );
}
