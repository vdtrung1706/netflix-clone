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
import { truncate } from '@utils/convertor.utils';
import { defaultEasing } from '@utils/motion.utils';
import useViewport from '@hooks/useViewport';
import cx from 'classnames';
import { motion } from 'framer-motion';
import { useEffect, useCallback, useState, useMemo, useRef } from 'react';
import PreviewPopperTip from './PreviewPopperTip';
import ModalPlayer from './ModalPlayer';

function DetailModal({
  movie,
  open,
  muted,
  previewRect,
  translateX,
  currentTimeRef,
  liked,
  inMyList,
  disliked,
  toggleDisliked,
  toggleLiked,
  toggleMyList,
  toggleMuted,
  closeModal,
}) {
  const videoTimeout = useRef(null);
  const [modalStatus, setModalStatus] = useState({
    expanded: false,
    onTransition: true,
    played: false,
  });
  const { height } = useViewport();

  const { size, position, transform } = useDetailModal(
    modalStatus.expanded,
    previewRect,
    translateX,
  );

  const mainModalStyle = useMemo(
    () => ({
      top: position.top,
      left: position.left,
      right: position.right,
      width: size.width,
      height: size.height,
      transform: transform,
    }),
    [
      position.left,
      position.right,
      position.top,
      size.height,
      size.width,
      transform,
    ],
  );

  const fadeOutVariants = {
    exit: {
      scale: 0.8,
      opacity: 0,
      translateY: height * 0.2,
      transition: { duration: 0.5, ease: defaultEasing },
      willChange: 'opacity, transform',
    },
  };

  useEffect(() => {
    if (currentTimeRef.current > 0) {
      setModalStatus((pre) => ({
        ...pre,
        expanded: true,
        onTransition: false,
        played: true,
      }));
    } else {
      setModalStatus((pre) => ({
        ...pre,
        expanded: true,
        onTransition: false,
      }));
      videoTimeout.current = setTimeout(
        () => setModalStatus((pre) => ({ ...pre, played: true })),
        2500,
      );
    }

    return () => {
      if (videoTimeout.current) clearTimeout(videoTimeout.current);
    };
  }, [currentTimeRef]);

  const handleVideoEnd = useCallback(() => {
    setModalStatus((pre) => ({
      ...pre,
      played: false,
    }));
  }, []);

  return (
    <Modal
      open={open}
      onClose={closeModal}
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 25 }}
      className="absolute block h-auto overflow-x-hidden overflow-y-scroll"
    >
      <motion.div
        variants={fadeOutVariants}
        exit="exit"
        className={cx('relative', { 'h-full': !modalStatus.expanded })}
      >
        <div
          style={{ ...mainModalStyle }}
          className={cx('absolute rounded-md drop-shadow-2xl text-white', {
            'transition-all duration-500 ease-linear mt-8':
              modalStatus.expanded,
          })}
        >
          <div className="flex flex-col w-full bg-black rounded-md box-shadow-full">
            <div className="w-full border-b border-opacity-50 border-solid border-black-pure">
              {modalStatus.played ? (
                <ModalPlayer
                  muted={muted}
                  onEnded={handleVideoEnd}
                  currentTime={currentTimeRef.current}
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
                onClick={closeModal}
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
              <div
                className={cx(
                  'absolute transition-opacity duration-500 left-0 flex flex-col content-center justify-between w-full -mt-32 align-middle lg:-mt-36',
                  {
                    'opacity-0': !modalStatus.expanded,
                    'opacity-100': modalStatus.expanded,
                  },
                )}
              >
                <h1 className="w-1/2 my-4 ml-10 text-xl font-bold lg:text-2xl lg:w-5/12">
                  {movie.title || movie.name || movie.original_name}
                </h1>
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
                        onClick={toggleMyList}
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
                        onClick={toggleLiked}
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
                        onClick={toggleDisliked}
                        className="box-border relative p-2 mr-2 text-white transition-all duration-200 bg-black bg-opacity-50 border border-white border-solid rounded-full hover:bg-opacity-40 hover:bg-black-lighter w-9 h-9 border-opacity-70 hover:border-opacity-100"
                      />
                    </PreviewPopperTip>
                  </div>
                  <ToggleSoundButton
                    muted={muted}
                    onClick={toggleMuted}
                    className={cx(
                      'box-border p-2 transition-all duration-200 bg-black border border-white border-solid rounded-full opacity-40 bg-opacity-60 w-9 h-9 hover:opacity-100 border-opacity-70 hover:border-opacity-100',
                      { hidden: !modalStatus.played },
                    )}
                  />
                </div>
              </div>
            </div>
            {/* Infor */}
            <div
              className={cx(
                'transition-opacity duration-500 relative flex justify-between w-full my-3',
                {
                  'opacity-0': !modalStatus.expanded,
                  'opacity-100': modalStatus.expanded,
                },
              )}
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
              <div className="flex flex-col w-1/3 gap-4 px-10 text-xs">
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
              </div>
            </div>

            {/* More Info */}
            {!modalStatus.onTransition && (
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
        </div>
      </motion.div>
    </Modal>
  );
}

export default DetailModal;
