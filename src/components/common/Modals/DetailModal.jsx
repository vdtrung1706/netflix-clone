/* eslint-disable jsx-a11y/media-has-caption */
import {
  AddToMyListButton,
  ToggleDislikedButton,
  ToggleLikedButton,
  ToggleSoundButton,
} from '@components/buttons';
import useDetailModal from '@hooks/useDetailModal';
import { Modal } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import { IMAGE_BASE } from '@services/axios.service';
import { selectCurrentUser } from '@store/auth/selectors.auth';
import { selectPlayer } from '@store/player/selectors.player';
import { truncate } from '@utils/convertor.utils';
import { defaultEasing, defaultFadeInVariants } from '@utils/motion.utils';
import cx from 'classnames';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import PreModalRender from './PreModalRender';
import PreviewPopperTip from './PreviewPopperTip';

function DetailModal({
  movie,
  previewRef,
  translateX,
  setPreviewVisible,
  handleClose,
  currentTime,
  liked,
  inMyList,
  disliked,
  toggleDisliked,
  toggleLiked,
  toggleMyList,
  toggleMuted,
}) {
  const previewRect = previewRef.current?.getBoundingClientRect();
  const [expanded, setExpanded] = useState(false);
  const [onTransition, setOnTransition] = useState(true);
  const openTimeout = useRef(null);
  const transitionTimeout = useRef(null);

  const { muted } = useSelector(selectPlayer);
  const currentUser = useSelector(selectCurrentUser);

  const { size, position, transform } = useDetailModal(
    expanded,
    previewRect,
    translateX,
  );

  const mainModalStyle = {
    top: position.top,
    left: position.left,
    right: position.right,
    width: size.width,
    height: size.height,
    transform: transform,
  };

  useEffect(() => {
    if (!openTimeout?.current) {
      openTimeout.current = setTimeout(() => {
        setExpanded(true);
        setPreviewVisible(false);
      }, 500);
    }
    if (!transitionTimeout?.current) {
      transitionTimeout.current = setTimeout(() => {
        setOnTransition(false);
      }, 1000);
    }
    return () => {
      clearTimeout(openTimeout.current);
      clearTimeout(transitionTimeout.current);
    };
  }, [setPreviewVisible]);

  const handleVideoMounted = (element) => {
    if (!element) return;
    element.currentTime = currentTime;
  };

  return (
    <Modal
      open={true}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 1200,
      }}
      className="absolute block h-auto overflow-x-hidden overflow-y-scroll"
    >
      <motion.div
        variants={defaultFadeInVariants}
        initial="initital"
        animate="animate"
        exit="exit"
        className={cx('relative', { 'h-full': !expanded })}
      >
        <div
          style={{ ...mainModalStyle }}
          className={cx('absolute rounded-md drop-shadow-2xl text-white', {
            'transform-gpu transition-all duration-1200 mt-8': expanded,
          })}
        >
          {!expanded ? (
            <PreModalRender
              movieBackground={movie.backdrop_path}
              currentTime={currentTime}
            />
          ) : (
            <div className="flex flex-col w-full bg-black rounded-md box-shadow-full">
              <div className="w-full border-b border-opacity-50 border-solid border-black-pure">
                {currentTime > 0 ? (
                  <video
                    ref={handleVideoMounted}
                    muted={muted}
                    autoPlay
                    disableRemotePlayback
                    src="https://imdb-video.media-imdb.com/vi270974489/1434659607842-pgv4ql-1592298111084.mp4?Expires=1631347822&Signature=hAusBjXPGwAyj7wU0xRh2jj42-uycJh40jS37Ee2Tw95EJk4sPWNS~-2poIsmExmbOo3biqCUofvTorytt1xN6bMMcYO~6Let9b7jMFnmxjs65UJX7Yu5iMunf~RekPXPAj4lNigrB400RgIDAKKY2nqCDqurLI3ko~~uGWKplZeK2LzhFIyIe4MmHWcF2Hz4tjWUiwH5KfeCFh3rXZRW1ojwVijUlI9U6ArdSkoW2ao7kEsO8pYZ6Zr4VeqH4RXr1nECdiebHJiKec1iGlkKGDIrjF6c8bzc2Lsue64P9qY62xOlLcNxnmx~cObXN5CIxbXi5VsolTgNtFk4FO9Ig__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA"
                    className="object-cover object-center w-full h-full rounded-t-md"
                  />
                ) : (
                  <img
                    src={`${IMAGE_BASE}/original${movie.backdrop_path}`}
                    alt="detail_bg"
                    className="object-cover object-center rounded-t-md"
                  />
                )}
                <div className="absolute left-0 w-full h-48 -mt-48 bg-repeat-x bg-gradient-to-t from-black"></div>
                <button
                  onClick={handleClose}
                  className="box-border absolute top-0 right-0 w-8 h-8 p-2 mx-4 mt-6 rounded-full bg-black-pure bg-opacity-80"
                >
                  <svg viewBox="0 0 24 24" role="button">
                    <path
                      d="M12 10.586l7.293-7.293 1.414 1.414L13.414 12l7.293 7.293-1.414 1.414L12 13.414l-7.293 7.293-1.414-1.414L10.586 12 3.293 4.707l1.414-1.414L12 10.586z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 2, ease: defaultEasing },
                  }}
                  className="absolute left-0 flex flex-col content-center justify-between w-full -mt-32 align-middle lg:-mt-36"
                >
                  <h1 className="w-1/2 my-4 ml-10 text-xl font-bold lg:text-2xl lg:w-5/12">
                    {movie.title || movie.name || movie.original_name}
                  </h1>
                  <div className="flex items-center content-center justify-between mx-10">
                    <div className="flex items-center content-center align-middle h-9">
                      <button className="flex items-center justify-center px-3 mr-2 text-black bg-white border border-white border-solid rounded lg:px-6 max-w-max hover:bg-white-hover">
                        <div className="box-border relative w-8 h-8 text-black p-7px">
                          <svg viewBox="0 0 24 24">
                            <path
                              d="M6 4l15 8-15 8z"
                              fill="currentColor"
                            ></path>
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
                          onClick={() => toggleMyList(movie, currentUser.uid)}
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
                          onClick={() => toggleLiked(movie, currentUser.uid)}
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
                          onClick={() => toggleDisliked(movie, currentUser.uid)}
                          className="box-border relative p-2 mr-2 text-white transition-all duration-200 bg-black bg-opacity-50 border border-white border-solid rounded-full hover:bg-opacity-40 hover:bg-black-lighter w-9 h-9 border-opacity-70 hover:border-opacity-100"
                        />
                      </PreviewPopperTip>
                    </div>

                    <ToggleSoundButton
                      muted={muted}
                      onClick={toggleMuted}
                      className={cx(
                        'box-border p-2 transition-all duration-200 bg-black border border-white border-solid rounded-full opacity-30 bg-opacity-60 w-9 h-9 hover:opacity-100 border-opacity-70 hover:border-opacity-100',
                        { hidden: currentTime === 0 },
                      )}
                    />
                  </div>
                </motion.div>
              </div>

              {/* Infor */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 2, ease: defaultEasing },
                }}
                className="relative flex justify-between w-full my-3"
              >
                <div className="flex flex-col w-2/3 pl-10">
                  <div className="flex flex-wrap items-center content-center text-sm">
                    <span className="mr-2 font-semibold text-green">
                      98% match
                    </span>
                    <div className="flex items-center">
                      <span>{movie.release_date?.split('-')?.[0] || null}</span>
                      <span className="px-2 mx-2 leading-tight border border-white border-opacity-50 border-solid">
                        18+
                      </span>
                      <div>1h 42m</div>
                      <span className="px-1 mx-2 text-0.7rem font-light border border-white border-opacity-50 border-solid rounded leading-tight">
                        HD
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 overflow-hidden text-base">
                    {truncate(movie.overview, 140)}
                  </p>
                </div>
                {!onTransition && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 2, ease: defaultEasing },
                    }}
                    className="flex flex-col w-1/3 gap-4 px-10 text-xs"
                  >
                    <div className="break-words">
                      <span className="text-grey">Cast:</span>
                      <span className="ml-1">Json Statham,</span>
                      <span className="ml-1">Jenifer Lopez,</span>
                      <span className="ml-1">Michael Chikspans,</span>
                      <span className="ml-1">more</span>
                    </div>
                    <div className="break-normal">
                      <span className="text-grey">Genres:</span>
                      <span className="ml-1">US Movies,</span>
                      <span className="ml-1">Movies Based on Books,</span>
                      <span className="ml-1">Action & Adventure</span>
                    </div>
                    <div>
                      <span className="text-grey">This movie is: </span>
                      <span className="ml-1">Exciting</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* More Info */}
              {!onTransition && (
                <div className="w-full">
                  <div className="px-10">
                    <div className="text-xl font-bold">More Like This</div>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </Modal>
  );
}

export default DetailModal;
