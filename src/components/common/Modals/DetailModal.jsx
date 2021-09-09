import useDetailModal from '@hooks/useDetailModal';
import { Modal } from '@material-ui/core';
import { IMAGE_BASE } from '@services/axios.service';
import { truncate } from '@utils/convertor.utils';
import cx from 'classnames';
import { useEffect, useRef, useState } from 'react';
import PreviewPopperTip from './PreviewPopperTip';

function DetailModal({
  isBig,
  movie,
  previewRef,
  translateX,
  setPreviewVisible,
  handleClose,
}) {
  const previewRect = previewRef.current?.getBoundingClientRect();
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [inMyList, setInMyList] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [ontransition, setOntransition] = useState(true);
  const timeoutRef = useRef(null);
  const timeoutTransRef = useRef(null);

  useEffect(() => {
    if (!timeoutRef?.current) {
      timeoutRef.current = setTimeout(() => {
        setOpen(true);
        setPreviewVisible(false);
      }, 500);
    }

    if (!timeoutTransRef?.current) {
      timeoutTransRef.current = setTimeout(() => {
        setOntransition(false);
      }, 1500);
    }
    return () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(timeoutTransRef.current);
    };
  }, [setPreviewVisible]);

  const { size, position, transform } = useDetailModal(
    open,
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

  return (
    <Modal
      open={isBig}
      className="absolute block h-auto overflow-x-hidden overflow-y-scroll"
    >
      <div
        className={cx('relative', {
          'h-full': !open,
        })}
      >
        <div
          style={{ ...mainModalStyle }}
          className={cx('absolute rounded-md drop-shadow-2xl text-white', {
            'transition-all duration-1000 delay-75 ease-in mt-5': open,
          })}
        >
          {/* Image background or video */}
          <div className="flex flex-col w-full bg-black rounded-md">
            <div className="w-full border-b border-opacity-50 border-solid border-black-pure">
              {!movie?.backdrop_path ? (
                <img
                  src={`${IMAGE_BASE}/original${movie.backdrop_path}`}
                  alt="small-preview-player"
                  className="object-cover object-center rounded-t-md"
                />
              ) : (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <video
                  className="object-cover object-center w-full h-full"
                  src="https://imdb-video.media-imdb.com/vi605208601/1434659607842-pgv4ql-1624467900509.mp4?Expires=1631256447&Signature=Kpj0y2m9LGlJmfx4eDdrRm9xzBqmIYUJC81M98G6ID6L~ltNh71XnAe0JK6172xH~JHkrzK7pFcMNkYT6AVBeEBzGXpgR-YZpJ7tyz4CO3kGqiddA0132SqwlyFLa-wIgI1NwubZHbptJpy-Oas8747IHG8Dz5Lg39ziYUCQAON37-NEtOF0L7f2MpWOKx2-0rMLPYAkgYG7RmmBYKw8oYholdJIVpDKZiAnZzW8~KCSc8tgc2hoe0yTkPjUs9IzRJqZJei1ORCBR89FVYO37uXSeDU5~DzPyzBUfv~z1l9Shm0nq4~S19bV1Hdkuj49Ca815C5L32vTluE1ASR7pA__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA"
                  loop
                  muted={muted}
                  autoPlay
                  disableRemotePlayback
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
              <div className="absolute left-0 flex flex-col content-center justify-between w-full -mt-32 align-middle lg:-mt-36">
                <h1 className="w-1/2 my-4 ml-10 text-xl font-bold lg:text-2xl lg:w-5/12">
                  {movie.title || movie.name || movie.original_name}
                </h1>
                <div className="flex items-center content-center justify-between mx-10">
                  <div className="flex items-center content-center align-middle h-9">
                    <button className="flex items-center justify-center px-3 mr-2 text-black bg-white border border-white border-solid rounded lg:px-6 max-w-max hover:bg-white-hover">
                      <div className="box-border relative w-8 h-8 p-2 text-black">
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
                      <button
                        onClick={() => setInMyList((pre) => !pre)}
                        className="box-border p-2 mr-2 transition-all duration-200 bg-black bg-opacity-50 border border-white border-solid rounded-full hover:bg-opacity-40 hover:bg-black-lighter w-9 h-9 border-opacity-70 hover:border-opacity-100"
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
                        onClick={() => {
                          if (liked === false) {
                            setDisliked(false);
                          }
                          setLiked((pre) => !pre);
                        }}
                        className="box-border relative p-2 mr-2 text-white transition-all duration-200 bg-black bg-opacity-50 border border-white border-solid rounded-full hover:bg-opacity-40 hover:bg-black-lighter w-9 h-9 border-opacity-70 hover:border-opacity-100"
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
                        onClick={() => {
                          if (disliked === false) {
                            setLiked(false);
                          }
                          setDisliked((pre) => !pre);
                        }}
                        className="box-border relative p-2 mr-2 text-white transition-all duration-200 bg-black bg-opacity-50 border border-white border-solid rounded-full hover:bg-opacity-40 hover:bg-black-lighter w-9 h-9 border-opacity-70 hover:border-opacity-100"
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
                  <button
                    onClick={() => setMuted((pre) => !pre)}
                    className="box-border p-2 transition-all duration-200 bg-black border border-white border-solid rounded-full opacity-30 bg-opacity-60 w-9 h-9 hover:opacity-100 border-opacity-70 hover:border-opacity-100"
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
              </div>
            </div>

            {/* Infor */}
            <div className="relative flex justify-between w-full my-3">
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
            {!ontransition && (
              <div className="w-full">
                <div className="px-10">
                  <div className="text-xl font-bold">More Like This</div>
                  <div>1</div>
                  <div>2</div>
                  <div>3</div>
                  <div>4</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default DetailModal;
