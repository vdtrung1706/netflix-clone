import useViewport from '@hooks/useViewport';
import { Modal } from '@material-ui/core';
import { IMAGE_BASE } from '@services/axios.service';
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
  const { width } = useViewport();
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

  const marginX = (width - 850) / 2;
  const mainModalStyle = {
    top: open ? '0' : previewRect.top,
    left: open ? '0' : previewRect.left,
    right: open ? '0' : previewRect.right,
    width: open ? '850px' : previewRect.width,
    height: open ? '95%' : previewRect.height,
    transform: open
      ? `translateX(${marginX}px)`
      : `translate(${translateX}, -66.666667%)`,
  };

  return (
    <Modal
      hideBackdrop
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
            'transition-all duration-1000 delay-75 ease-in mt-20': open,
          })}
        >
          <div className="flex flex-col w-full rounded-md cursor-pointer select-none bg-black-light">
            <div className="w-full">
              {movie?.backdrop_path ? (
                <img
                  src={`${IMAGE_BASE}/original${movie.backdrop_path}`}
                  alt="small-preview-player"
                  className="object-cover object-center rounded-t-md"
                />
              ) : (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <video
                  className="object-cover object-center w-full h-full"
                  src="https://imdb-video.media-imdb.com/vi1867431961/1434659607842-pgv4ql-1630590421341.mp4?Expires=1631038986&Signature=EOeikQ6LQJT3pAjSre82rK1D4zxUCOXLka-NGJgD7huX4VnICXN~4rmwf~S5qhWRkYzZwrVdvHGHFpnvw2i~pxY96UaIJO-wEZ4t1rAEXdY~WCFmjJVDkAu5bHSVuo8l3CoOPffRl-wAhClgnN4N6007GZD1H47~18eW5AwS0IEvumRNtzx6AxmdSjay~Zmdy6mie1OMLzDCW-9e2vIELI4ZgKP~Dr~Uhm9N0ZWUGH~G3YnhzgR3suwXwfu9vP9MMTXvVbSI0izdtaS67~bJ6DK1X-GJIoId9yZlrkFaENsFZ8m2dh3U82Jh23O1U2MIUQQ7~D-0vvUx-20uxGGg9A__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA"
                  loop
                  muted={muted}
                  autoPlay
                  disableRemotePlayback
                />
              )}

              <button
                onClick={handleClose}
                className="box-border absolute top-0 right-0 w-8 h-8 p-2 m-4 rounded-full bg-black-lighter"
              >
                <svg viewBox="0 0 24 24" role="button">
                  <path
                    d="M12 10.586l7.293-7.293 1.414 1.414L13.414 12l7.293 7.293-1.414 1.414L12 13.414l-7.293 7.293-1.414-1.414L10.586 12 3.293 4.707l1.414-1.414L12 10.586z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>

              <div className="box-border absolute left-0 flex items-center content-center justify-between w-full -mt-24 align-middle px-11">
                <div className="flex items-center content-center align-middle">
                  <div className="flex items-center justify-around px-5 mr-2 text-black bg-white border border-white border-solid rounded h-9 max-w-max hover:bg-white-hover">
                    <div className="box-border relative p-2 text-black w-9 h-9 ">
                      <svg viewBox="0 0 24 24">
                        <path d="M6 4l15 8-15 8z" fill="currentColor"></path>
                      </svg>
                    </div>
                    <span className="font-bold">Play</span>
                  </div>

                  <PreviewPopperTip
                    arrow
                    className="text-white"
                    title={inMyList ? 'Remove from My List' : 'Add to My List'}
                    placement="top"
                  >
                    <button
                      onClick={() => setInMyList((pre) => !pre)}
                      className="box-border p-2 mr-2 transition-all duration-200 border border-white border-solid rounded-full bg-opacity-60 bg-black-light hover:bg-opacity-50 w-9 h-9 border-opacity-70 hover:border-opacity-100"
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
                      className="box-border relative p-2 mr-2 text-white transition-all duration-200 border border-white border-solid rounded-full bg-opacity-60 bg-black-light hover:bg-opacity-60 w-9 h-9 border-opacity-70 hover:border-opacity-100"
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
                      className="box-border relative p-2 mr-2 text-white transition-all duration-200 border border-white border-solid rounded-full bg-opacity-60 bg-black-light hover:bg-opacity-60 w-9 h-9 border-opacity-70 hover:border-opacity-100"
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
                  className="box-border p-2 transition-all duration-200 border border-white border-solid rounded-full opacity-50 bg-opacity-60 bg-black-light hover:bg-opacity-60 w-9 h-9 hover:opacity-100 border-opacity-70 hover:border-opacity-100"
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

            <div className="p-4 cursor-pointer">
              <div className="flex items-center content-center my-4 align-middle">
                <div className="font-semibold text-green">98% match</div>
                <div className="px-2 mx-2 border border-white border-solid">
                  18+
                </div>
                <div className="">1h 42m</div>
                <div className="px-1 mx-2 text-xs font-light border border-white border-solid rounded">
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

            {!ontransition && (
              <div className="p-4 cursor-pointer">
                <div className="flex items-center content-center my-4 align-middle">
                  <div className="font-semibold text-green">98% match</div>
                  <div className="px-2 mx-2 border border-white border-solid">
                    18+
                  </div>
                  <div className="">1h 42m</div>
                  <div className="px-1 mx-2 text-xs font-light border border-white border-solid rounded">
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
                <div className="flex flex-wrap items-center content-center justify-start gap-1 my-4 text-center align-middle">
                  <div className="my-1">Action</div>
                  <span className="text-xs opacity-50">•</span>
                  <div className="my-1">Drama</div>
                  <span className="text-xs opacity-50">•</span>
                  <div className="my-1">Thriller</div>
                </div>
                <div className="flex flex-wrap items-center content-center justify-start gap-1 my-4 text-center align-middle">
                  <div className="my-1">Action</div>
                  <span className="text-xs opacity-50">•</span>
                  <div className="my-1">Drama</div>
                  <span className="text-xs opacity-50">•</span>
                  <div className="my-1">Thriller</div>
                </div>
                <div className="flex flex-wrap items-center content-center justify-start gap-1 my-4 text-center align-middle">
                  <div className="my-1">Action</div>
                  <span className="text-xs opacity-50">•</span>
                  <div className="my-1">Drama</div>
                  <span className="text-xs opacity-50">•</span>
                  <div className="my-1">Thriller</div>
                </div>
                <div className="flex flex-wrap items-center content-center justify-start gap-1 my-4 text-center align-middle">
                  <div className="my-1">Action</div>
                  <span className="text-xs opacity-50">•</span>
                  <div className="my-1">Drama</div>
                  <span className="text-xs opacity-50">•</span>
                  <div className="my-1">Thriller</div>
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
