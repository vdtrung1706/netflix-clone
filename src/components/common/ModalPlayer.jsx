import { memo } from 'react';

const ModalPlayer = ({ muted, onEnded, currentTime }) => {
  const hanldeVideoMouted = (element) => {
    if (element) {
      element.currentTime = currentTime + 0.1;
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      ref={hanldeVideoMouted}
      muted={muted}
      onEnded={onEnded}
      autoPlay
      disablePictureInPicture
      disableRemotePlayback
      src="https://imdb-video.media-imdb.com/vi591642649/1434659607842-pgv4ql-1629798983356.mp4?Expires=1631870291&Signature=qE-mgX7KPQi09KuhI3MD0aguRY1cPdRA6btvlHN4LwQHG1cGUW~j2mAF5s~fHciUFwnUyTbDt0-mKdEjqzE6ABTfI~e1U9n5IW7dC8wG1eGkCSUw3kdlkqnQRKBCMoxRPP~gwzljCV9A7dtYCn3fBnI-3Mb-v9rVB13ySufLqX1VS8VfoRQ9DFp2AqTCODEkWoP2fJDxCOC64~wVEP3HD3JQhagVeJ~eIEIjzWXOsqf5WrCeaPkzkv4dGKWTV4WtOAn0CKOBMVI78vcQOQCzLKdCEyghGkPk79vtAtpTBCKTHxrPqD6Ta81z9GTJpSANg6ThxJMJoD7e9BKwEJUjcg__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA"
      className="object-cover object-center w-full h-full rounded-t-md"
    />
  );
};

export default memo(ModalPlayer);
