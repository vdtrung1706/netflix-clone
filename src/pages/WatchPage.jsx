/* eslint-disable jsx-a11y/media-has-caption */
import { Forward10Icon } from '@assets/';
import { PlayIcon } from '@assets/';
import { QuestionIcon } from '@assets/';
import { FullScreenIcon } from '@assets/';
import { SpeedIcon } from '@assets/';
import { SubtitleIcon } from '@assets/';
import { SoundIcon } from '@assets/';
import { Backward10Icon } from '@assets/';
import { ArrowBackIcon } from '@assets/';
import AudioAndSubtitles from '@components/common/AudioAndSubtitles';
import CurrentTimeSlider from '@components/common/CurrentTimeSlider';
import SpeedAdjustment from '@components/common/SpeedAdjustment';
import VolumeSlider from '@components/common/VolumeSlider';
import WatchPageTip from '@components/common/WatchPageTip';
import CircleLoading from '@components/layout/loader/CircleLoading';
import { convertHMS } from '@utils/convertor.utils';
import { defaultPageFadeInVariants } from '@utils/motion.utils';
import cx from 'classnames';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const WatchPage = () => {
  const videoRef = useRef(null);
  const duration = useRef(0);
  const isOnChangeCurrentTime = useRef(false);
  const interactiveTimeout = useRef(null);
  const pausedOverlayTimeout = useRef(null);
  const [pausedOverlay, setPausedOverlay] = useState(true);
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [interactive, setInteractive] = useState(false);
  const [visibleCurrentTime, setVisibleCurrent] = useState(true);
  const videoSrc =
    'https://movietrailers.apple.com/movies/marvel/shang-chi-and-the-legend-of-the-ten-rings/shang-chi-and-the-legend-of-the-ten-rings-trailer-1_a720p.m4v';

  const history = useHistory();
  const {
    state: { movie },
  } = useLocation();

  useEffect(() => {
    return () => {
      if (interactiveTimeout.current) {
        clearTimeout(interactiveTimeout.current);
      }
      if (pausedOverlayTimeout.current) {
        clearTimeout(pausedOverlayTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      event.preventDefault();
      if (event.code == 'Space') {
        togglePlay();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [togglePlay]);

  //------------------------FUNCS-----------------------------
  function forward10() {
    if (!videoRef.current) return;
    const currentTime = videoRef.current.currentTime;
    if (currentTime + 10 >= duration) {
      videoRef.current.currentTime = duration;
    } else {
      videoRef.current.currentTime = currentTime + 10;
    }
  }

  function backward10() {
    if (!videoRef.current) return;
    const currentTime = videoRef.current.currentTime;
    if (currentTime - 10 <= 0) {
      videoRef.current.currentTime = 0;
    } else {
      videoRef.current.currentTime = currentTime - 10;
    }
  }

  function toggleFullscreen() {
    const el = document.documentElement;
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen();
      } else if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen();
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  function pausedOverlayOnClick() {
    setPausedOverlay(false);
    togglePlay();
  }

  function handleVolumeChange(value) {
    if (videoRef.current) {
      setVolume(value);
      setMuted(false);
      videoRef.current.volume = value / 100;
    }
  }

  function onChangeTimeSlider(_, value) {
    isOnChangeCurrentTime.current = true;
    setCurrentTime(value);
  }

  function onChangeCommittedSlider(_, value) {
    if (videoRef.current) {
      videoRef.current.currentTime = value;
      isOnChangeCurrentTime.current = false;
    }
  }

  const onMouseMoveContainer = useCallback(
    (event) => {
      event.preventDefault();
      if (
        !videoRef.current ||
        videoRef.current.readyState !== 4 ||
        loading ||
        pausedOverlay
      ) {
        return;
      }
      if (pausedOverlayTimeout.current) {
        clearTimeout(pausedOverlayTimeout.current);
      }
      if (paused) {
        pausedOverlayTimeout.current = setTimeout(() => {
          setPausedOverlay(true);
        }, 15000);
      }
      setInteractive(true);

      var targetClassName = event.target.className;
      if (typeof targetClassName !== 'string') {
        targetClassName = event.target.className.baseVal;
      }
      if (interactiveTimeout.current) clearTimeout(interactiveTimeout.current);
      interactiveTimeout.current = setTimeout(() => {
        if (targetClassName?.includes('onHide')) setInteractive(false);
      }, 3000);
    },
    [loading, paused, pausedOverlay],
  );

  function isPlaying(videoEl) {
    return !!(
      videoEl &&
      videoEl.currentTime > 0 &&
      !videoEl.paused &&
      !videoEl.ended &&
      videoEl.readyState > 2
    );
  }

  function onCanPlay() {
    duration.current = parseInt(videoRef.current.duration);
    setLoading(false);
  }

  const togglePlay = useCallback(() => {
    if (isPlaying(videoRef.current)) {
      videoRef.current.pause();
      handlePaused(true);
    } else {
      const promise = videoRef.current.play();
      if (promise !== undefined) {
        promise
          .then(() => {})
          .catch((error) => alert(`Video Source error: ${error.message}`));
      }
    }
  }, [handlePaused]);

  const handlePaused = useCallback(
    (value) => {
      setPaused(value);
      if (value) {
        pausedOverlayTimeout.current = setTimeout(() => {
          if (!interactive) {
            setPausedOverlay(true);
          }
        }, 15000);
      }
    },
    [interactive],
  );

  function onTimeUpdate() {
    if (!isOnChangeCurrentTime.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  }

  const onPlaying = useCallback(() => {
    setPausedOverlay(false);
    setLoading(false);
    handlePaused(false);
  }, [handlePaused]);

  const onMouseDown = useCallback(
    (event) => {
      if (event.button === 0) {
        togglePlay();
      }
    },
    [togglePlay],
  );

  return (
    <motion.div
      variants={defaultPageFadeInVariants}
      initial="initial"
      animate="animate"
      onMouseMove={onMouseMoveContainer}
      className={cx(
        'absolute top-0 left-0 w-full h-full bg-black-pure onHide overflow-hidden',
        {
          'cursor-none': !interactive && !loading && !pausedOverlay,
        },
      )}
    >
      <div className="absolute top-0 left-0 w-full h-full onHide">
        {loading && !pausedOverlay && (
          <div className="absolute top-0 bottom-0 z-10 flex items-center w-full max-h-full bg-opacity-30 onHide bg-black-pure">
            <CircleLoading className="w-10 h-10 m-auto" />
          </div>
        )}

        {pausedOverlay && (
          <div
            role="button"
            tabIndex="0"
            onMouseDown={onMouseDown}
            className="absolute top-0 bottom-0 left-0 right-0 z-20 w-full h-full my-auto cursor-default bg-opacity-30 bg-black-pure"
          >
            <div className="relative w-full h-full">
              <div className="p-20 text-base sm:text-xl lg:text-2xl">
                {movie?.name || movie.title || movie.originalName}
              </div>
              <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
                <button
                  onClick={pausedOverlayOnClick}
                  className="p-1 my-auto border-2 border-white rounded-full border-opacity-40 hover:border-opacity-100 h-9 w-9"
                >
                  <PlayIcon />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center w-full max-h-full z-5 onHide">
          <video
            onMouseDown={onMouseDown}
            ref={videoRef}
            src={videoSrc}
            muted={muted}
            preload="auto"
            type="video/mp4"
            onCanPlay={onCanPlay}
            onPlaying={onPlaying}
            onTimeUpdate={onTimeUpdate}
            onEnded={() => handlePaused(true)}
            onLoadStart={() => setLoading(true)}
            onWaiting={() => setLoading(true)}
            className="object-cover object-center w-full max-h-full my-auto onHide"
          />
        </div>

        <div
          className={cx(
            'transition-opacity duration-300 absolute top-0 left-0 right-0 z-10 flex items-center h-28 px-2 onHide',
            {
              'opacity-0 invisible': !interactive,
            },
          )}
        >
          <button
            onClick={history.goBack}
            className="p-1 pb-4 pl-0 mx-1 my-auto transition-transform duration-300 w-7 h-7 sm:w-8 sm:h-8 md:mx-2 lg:h-9 lg:w-9"
          >
            <ArrowBackIcon className="svg-hover-scale" />
          </button>
        </div>

        <div
          className={cx(
            'transition-opacity duration-300 pb-3 absolute bottom-0 left-0 right-0 z-10 flex flex-col h-28 cursor-auto onHide',
            {
              'opacity-0 invisible': !interactive,
            },
          )}
        >
          <div
            className={cx(
              'flex items-center mx-2 transition-opacity duration-300',
              {
                'opacity-0 invisible': !visibleCurrentTime || !interactive,
              },
            )}
          >
            <div className="w-full">
              <CurrentTimeSlider
                min={0}
                max={duration.current}
                value={currentTime}
                onChange={onChangeTimeSlider}
                onChangeCommitted={onChangeCommittedSlider}
              />
            </div>
            <div className="text-sm text-right w-14">
              {convertHMS(duration.current - currentTime)}
            </div>
          </div>

          <div className="flex items-center justify-between h-full px-2 onHide">
            <div className="flex items-center">
              <button onClick={togglePlay} className="pl-0 btn-watchpage">
                <PlayIcon playing={!paused} className="svg-hover-scale" />
              </button>
              <button onClick={backward10} className="btn-watchpage">
                <Forward10Icon className="svg-hover-scale" />
              </button>
              <button onClick={forward10} className="btn-watchpage">
                <Backward10Icon className="svg-hover-scale" />
              </button>

              <WatchPageTip
                describeChild
                title={
                  <VolumeSlider
                    volume={volume}
                    setVolume={handleVolumeChange}
                  />
                }
                onOpen={() => setVisibleCurrent(false)}
                onClose={() => setVisibleCurrent(true)}
              >
                <button
                  onClick={() => setMuted((pre) => !pre)}
                  className="btn-watchpage"
                >
                  <SoundIcon
                    muted={muted}
                    volume={volume}
                    className="svg-hover-scale"
                  />
                </button>
              </WatchPageTip>
            </div>

            <div className="text-sm cursor-default md:text-base">
              {movie?.name || movie.title || movie.originalName}
            </div>

            <div className="flex gap-2">
              <WatchPageTip
                describeChild
                title={
                  <div className="p-3 text-base font-normal">
                    Something wrong? Tell us.
                  </div>
                }
                onOpen={() => setVisibleCurrent(false)}
                onClose={() => setVisibleCurrent(true)}
              >
                <button className="btn-watchpage">
                  <QuestionIcon className="svg-hover-scale" />
                </button>
              </WatchPageTip>
              <WatchPageTip
                describeChild
                title={<AudioAndSubtitles />}
                onOpen={() => setVisibleCurrent(false)}
                onClose={() => setVisibleCurrent(true)}
              >
                <button className="btn-watchpage">
                  <SubtitleIcon className="svg-hover-scale" />
                </button>
              </WatchPageTip>
              <WatchPageTip
                describeChild
                title={<SpeedAdjustment />}
                onOpen={() => setVisibleCurrent(false)}
                onClose={() => setVisibleCurrent(true)}
              >
                <button className="btn-watchpage">
                  <SpeedIcon className="svg-hover-scale" />
                </button>
              </WatchPageTip>
              <button onClick={toggleFullscreen} className="btn-watchpage">
                <FullScreenIcon className="svg-hover-scale" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WatchPage;
