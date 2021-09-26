/* eslint-disable jsx-a11y/media-has-caption */
import { memo, useCallback } from 'react';

const DetailPlayer = ({
  muted,
  videoSrc,
  currentTime,
  played,
  backgroundSrc,
  onEnded,
  onClickPlay,
}) => {
  const handleVideoMouted = useCallback(
    (element) => {
      if (element) {
        element.currentTime = currentTime;
      }
    },
    [currentTime],
  );

  return (
    <>
      {played && (
        <video
          ref={handleVideoMouted}
          muted={muted}
          autoPlay
          src={videoSrc}
          disablePictureInPicture
          disableRemotePlayback
          onClick={onClickPlay}
          onEnded={onEnded}
          onError={onEnded}
          className="absolute top-0 bottom-0 left-0 right-0 z-10 object-cover object-center w-full h-full rounded-t-md"
        />
      )}

      <img
        role="none"
        onClick={onClickPlay}
        src={backgroundSrc}
        alt="detail_bg"
        className={`absolute top-0 bottom-0 left-0 right-0 object-cover object-center w-full h-full z-1 rounded-t-md ${
          played ? 'hidden' : ''
        }`}
      />
    </>
  );
};

export default memo(DetailPlayer);
