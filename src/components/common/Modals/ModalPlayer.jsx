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
      src="https://imdb-video.media-imdb.com/vi394707225/1434659607842-pgv4ql-1602090193929.mp4?Expires=1631689266&Signature=cAY4zSXyvVSa2ugMC3camRPrhkPhrUlleJP41FXzJmi1XyHlwXMUcBecipoJqVGJn-0dQBOV~SSxxQKLKV5hUuLAanKb9mPtt4odGFgrViD2usUyqokZdGpNAhWNQitQhbuzM7S6JFniYMV-AHVhatneDuchL8kq-LdWOOnu~3-unePpYYF8UCiKbFpjxxjhWHTkFeYLtL08WW-gOndSBFft2NITpGW-zT9FjN4M0kuYGcpwwMq6BnlupBRlrkIAE5EYPoPAJldZAjXjSYhh22Ni5rIa-d2RcmmW2WAbi9shHiNxXiwP2v4K0AfFoFURuIpAATWHERlKL7KEPsuQ3g__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA"
      className="object-cover object-center w-full h-full rounded-t-md"
    />
  );
};

export default memo(ModalPlayer);
