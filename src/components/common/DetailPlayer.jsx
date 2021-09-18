/* eslint-disable jsx-a11y/media-has-caption */
import { memo, useCallback } from 'react';

const DetailPlayer = ({
  muted,
  videoSrc,
  currentTime,
  played,
  backgroundSrc,
  onEnded,
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
          onEnded={onEnded}
          autoPlay
          disablePictureInPicture
          disableRemotePlayback
          onError={onEnded}
          src={videoSrc}
          className="absolute top-0 bottom-0 left-0 right-0 z-10 object-cover object-center w-full h-full rounded-t-md"
        />
      )}

      <img
        src={backgroundSrc}
        alt="detail_bg"
        className="absolute top-0 bottom-0 left-0 right-0 object-cover object-center w-full h-full z-1 rounded-t-md"
      />
    </>
  );
};

export default memo(DetailPlayer);
