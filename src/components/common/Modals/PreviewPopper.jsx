/* eslint-disable jsx-a11y/media-has-caption */
import usePreviewPopper from '@hooks/usePreviewPopper';
import { Popper } from '@material-ui/core';
import { IMAGE_BASE } from '@services/axios.service';
import { selectCurrentUser } from '@store/auth/selectors.auth';
import { selectPlayer } from '@store/player/selectors.player';
import { playerActions } from '@store/player/slice.player';
import { selectUserLists } from '@store/user-lists/selectors.user-lists';
import { userListsActions } from '@store/user-lists/slice.user-lists';
import { includeObjectById } from '@utils/array.utils';
import { defaultEasing } from '@utils/motion.utils';
import cx from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DetailModal from './DetailModal';
import PreviewPopperTip from './PreviewPopperTip';

export default function PreviewPopper({
  movie,
  open,
  anchorEl,
  transformOrigin,
  handleClose,
}) {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const videoTimeout = useRef(null);
  const [isBig, setIsBig] = useState(false);
  const [play, setPlay] = useState(false);
  const [visible, setVisible] = useState(true);
  const [onClosing, setOnClosing] = useState(false);

  const dispatch = useDispatch();
  const { muted } = useSelector(selectPlayer);
  const currentUser = useSelector(selectCurrentUser);
  const { myList, dislikedList, likedList } = useSelector(selectUserLists);

  const liked = includeObjectById(likedList, movie.id);
  const disliked = includeObjectById(dislikedList, movie.id);
  const inMyList = includeObjectById(myList, movie.id);

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

  const toggleMyList = useCallback(
    (movie, userId) => {
      dispatch(userListsActions.toggleMyList({ movie, userId }));
    },
    [dispatch],
  );

  const toggleLiked = useCallback(
    (movie, userId) => {
      dispatch(userListsActions.toggleLiked({ movie, userId }));
    },
    [dispatch],
  );

  const toggleDisliked = useCallback(
    (movie, userId) => {
      dispatch(userListsActions.toggleDisliked({ movie, userId }));
    },
    [dispatch],
  );

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
        className="flex flex-col rounded-md cursor-pointer select-none w-350px"
      >
        {/* Image Or Video */}
        <motion.div
          exit={{
            opacity: 0.4,
            transition: { duration: 0.3, ease: defaultEasing },
          }}
          className="relative w-full min-h-196.88px bg-black-light rounded-t-md"
        >
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
              <button
                onClick={() => dispatch(playerActions.toggleMuted())}
                className="box-border absolute top-0 right-0 w-10 h-10 p-2 mx-4 mt-8 text-white duration-200 bg-white border border-solid rounded-full text-opacity-30 opacity-30 hover:text-opacity-100 bg-opacity-5 hover:opacity-100 border-grey hover:border-white trnasition-all"
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
        </motion.div>

        {/* Buttons */}
        <motion.div
          exit={{
            opacity: 0,
            transition: { delay: 0.1, duration: 0.4, ease: defaultEasing },
          }}
          className="p-4 cursor-pointer bg-black-light rounded-b-md"
        >
          <div className="flex items-center content-center justify-between align-middle">
            <div className="flex items-center content-center align-middle">
              <div className="box-border relative w-10 h-10 p-2 mr-2 text-black bg-white border border-white border-solid rounded-full hover:bg-white-hover">
                <svg viewBox="0 0 24 24">
                  <path d="M6 4l15 8-15 8z" fill="currentColor"></path>
                </svg>
              </div>
              <PreviewPopperTip
                arrow
                className="text-white"
                title={inMyList ? 'Remove from My List' : 'Add to My List'}
                placement="top"
              >
                <button
                  onClick={() => toggleMyList(movie, currentUser.uid)}
                  className="box-border w-10 h-10 p-2 mr-2 duration-200 bg-white border border-solid rounded-full bg-opacity-5 border-grey hover:border-white trnasition-all"
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
              </PreviewPopperTip>
              <PreviewPopperTip
                arrow
                className="text-white"
                title={liked ? 'Rated' : 'I like this'}
                placement="top"
              >
                <button
                  onClick={() => toggleLiked(movie, currentUser.uid)}
                  className="box-border relative w-10 h-10 p-2 mr-2 text-white duration-200 bg-white border border-solid rounded-full bg-opacity-5 border-grey hover:border-white trnasition-all"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    {liked ? (
                      <path
                        d="M19.583 20.488c0 1.055-.985 1.398-1.764 1.467l-5.798.023c-4.675 0-4.446-1.49-8.021-1.787v-7.173l2.544-1.444 3.094-5.592s.343-4.514.343-4.744c0 0 2.773-1.352 3.484 2.384.687 3.735.206 6.05.068 6.37h6.05c.802.092 1.788.482 1.788 1.559 0 1.031-.986 1.398-1.788 1.444l.62.023c.778.091 1.787.435 1.787 1.49 0 1.076-1.009 1.42-1.788 1.489l-1.214.023c.825.068 1.81.435 1.81 1.49 0 1.03-.985 1.42-1.81 1.466h-1.17c.78.092 1.765.458 1.765 1.512z"
                        fill="currentColor"
                      ></path>
                    ) : (
                      <path
                        d="M15.167 8.994h3.394l.068.023c1.56.138 2.867.987 2.867 2.73 0 .275-.046.527-.092.78.367.435.596.986.596 1.72 0 .963-.39 1.52-1.032 1.978.023.183.023.252.023.39 0 .963-.39 1.784-1.009 2.243.023.206.023.275.023.39 0 1.743-1.33 2.591-2.89 2.73L12.21 22c-2.04 0-3.05-.252-4.563-.895-.917-.39-1.353-.527-2.27-.619L4 20.371v-8.234l2.476-1.445 2.27-4.427c0-.046.085-1.552.253-4.52l.871-.389c.092-.069.275-.138.505-.184.664-.206 1.398-.252 2.132 0 1.261.436 2.064 1.537 2.408 3.258.142.829.226 1.695.26 2.564l-.008 2zm-4.42-2.246l-2.758 5.376L6 13.285v5.26c.845.113 1.44.3 2.427.72 1.37.58 2.12.735 3.773.735l4.816-.023c.742-.078.895-.3 1.015-.542.201-.4.201-.876 0-1.425.558-.184.917-.479 1.078-.883.182-.457.182-.966 0-1.528.601-.228.901-.64.901-1.238s-.202-1.038-.608-1.32c.23-.46.26-.892.094-1.294-.168-.404-.298-.627-1.043-.738l-.172-.015h-5.207l.095-2.09c.066-1.448-.009-2.875-.216-4.082-.216-1.084-.582-1.58-1.096-1.758-.259-.09-.546-.086-.876.014-.003.06-.081 1.283-.235 3.67z"
                        fill="currentColor"
                      ></path>
                    )}
                  </svg>
                </button>
              </PreviewPopperTip>
              <PreviewPopperTip
                arrow
                className="text-white"
                title={disliked ? 'Rated' : 'Not for me'}
                placement="top"
              >
                <button
                  onClick={() => toggleDisliked(movie, currentUser.uid)}
                  className="box-border relative w-10 h-10 p-2 mr-2 text-white duration-200 bg-white border border-solid rounded-full bg-opacity-5 border-grey hover:border-white trnasition-all"
                >
                  <svg viewBox="0 0 24 24">
                    {disliked ? (
                      <path
                        d="M4.417 3.512c0-1.055.985-1.398 1.764-1.467l5.798-.023c4.675 0 4.446 1.49 8.021 1.787v7.173l-2.544 1.444-3.094 5.592s-.343 4.514-.343 4.744c0 0-2.773 1.352-3.484-2.384-.687-3.735-.206-6.05-.068-6.37h-6.05c-.802-.092-1.788-.482-1.788-1.559 0-1.031.986-1.398 1.788-1.444l-.62-.023c-.778-.091-1.787-.435-1.787-1.49 0-1.076 1.009-1.42 1.788-1.489l1.214-.023c-.825-.068-1.81-.435-1.81-1.49 0-1.03.985-1.42 1.81-1.466h1.17c-.78-.092-1.765-.458-1.765-1.512z"
                        fill="currentColor"
                      ></path>
                    ) : (
                      <path
                        d="M8.833 15.006H5.44l-.068-.023c-1.56-.138-2.867-.987-2.867-2.73 0-.275.046-.527.092-.78C2.23 11.038 2 10.487 2 9.753c0-.963.39-1.52 1.032-1.978-.023-.183-.023-.252-.023-.39 0-.963.39-1.784 1.009-2.243-.023-.206-.023-.275-.023-.39 0-1.743 1.33-2.591 2.89-2.73L11.79 2c2.04 0 3.05.252 4.563.895.917.39 1.353.527 2.27.619L20 3.629v8.234l-2.476 1.445-2.27 4.427c0 .046-.085 1.552-.253 4.52l-.871.389c-.092.069-.275.138-.505.184-.664.206-1.398.252-2.132 0-1.261-.436-2.064-1.537-2.408-3.258a19.743 19.743 0 0 1-.26-2.564l.008-2zm4.42 2.246l2.758-5.376L18 10.715v-5.26c-.845-.113-1.44-.3-2.427-.72C14.203 4.156 13.453 4 11.8 4l-4.816.023c-.742.078-.895.3-1.015.542-.201.4-.201.876 0 1.425-.558.184-.917.479-1.078.883-.182.457-.182.966 0 1.528-.601.228-.901.64-.901 1.238s.202 1.038.608 1.32c-.23.46-.26.892-.094 1.294.168.404.298.627 1.043.738l.172.015h5.207l-.095 2.09c-.066 1.448.009 2.875.216 4.082.216 1.084.582 1.58 1.096 1.758.259.09.546.086.876-.014.003-.06.081-1.283.235-3.67z"
                        fill="currentColor"
                      ></path>
                    )}
                  </svg>
                </button>
              </PreviewPopperTip>
            </div>
            <PreviewPopperTip
              arrow
              className="text-white"
              title="More info"
              placement="top"
            >
              <button
                onClick={() => {
                  setIsBig(true);
                }}
                className="box-border relative w-10 h-10 p-1 duration-200 bg-white border border-solid rounded-full bg-opacity-5 border-grey hover:border-white trnasition-all"
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
        </motion.div>

        {/* Show Big Modal */}
        <AnimatePresence>
          {isBig && (
            <DetailModal
              previewRef={ref}
              currentTime={videoRef.current ? videoRef.current.currentTime : 0}
              movie={movie}
              transformOrigin={transformOrigin}
              handleClose={handleModalClose}
              setPreviewVisible={setVisible}
              translateX={getTranslateX()}
              toggleDisliked={toggleDisliked}
              toggleLiked={toggleLiked}
              toggleMyList={toggleMyList}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </Popper>
  );
}
