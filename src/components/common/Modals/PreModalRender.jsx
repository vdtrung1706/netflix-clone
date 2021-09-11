import {
  AddToMyListButton,
  ToggleDislikedButton,
  ToggleLikedButton,
  ToggleSoundButton,
  MoreInfoButton,
} from '@components/buttons';
import { IMAGE_BASE } from '@services/axios.service';
import { memo } from 'react';

const PreModalRender = ({ movieBackground, currentTime }) => {
  const handleVideoMounted = (element) => {
    if (!element) return;
    element.currentTime = currentTime;
  };

  return (
    <div className="flex flex-col rounded-md cursor-pointer select-none w-350px">
      <div className="relative w-full min-h-196.88px bg-black-light">
        {currentTime > 0 ? (
          <>
            <video
              ref={handleVideoMounted}
              muted
              autoPlay
              disableRemotePlayback
              src="https://imdb-video.media-imdb.com/vi270974489/1434659607842-pgv4ql-1592298111084.mp4?Expires=1631347822&Signature=hAusBjXPGwAyj7wU0xRh2jj42-uycJh40jS37Ee2Tw95EJk4sPWNS~-2poIsmExmbOo3biqCUofvTorytt1xN6bMMcYO~6Let9b7jMFnmxjs65UJX7Yu5iMunf~RekPXPAj4lNigrB400RgIDAKKY2nqCDqurLI3ko~~uGWKplZeK2LzhFIyIe4MmHWcF2Hz4tjWUiwH5KfeCFh3rXZRW1ojwVijUlI9U6ArdSkoW2ao7kEsO8pYZ6Zr4VeqH4RXr1nECdiebHJiKec1iGlkKGDIrjF6c8bzc2Lsue64P9qY62xOlLcNxnmx~cObXN5CIxbXi5VsolTgNtFk4FO9Ig__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA"
              className="object-cover object-center w-full h-full rounded-t-md"
            />
            <ToggleSoundButton className="box-border absolute top-0 right-0 w-10 h-10 p-2 mx-4 mt-8 text-white duration-200 bg-white border border-solid rounded-full text-opacity-30 opacity-30 hover:text-opacity-100 bg-opacity-5 hover:opacity-100 border-grey hover:border-white trnasition-all" />
          </>
        ) : (
          <img
            src={`${IMAGE_BASE}/original${movieBackground}`}
            alt="small-preview-player"
            className="object-cover object-center w-full h-full rounded-t-md"
          />
        )}
      </div>
      {/* Buttons */}
      <div className="p-4 cursor-pointer bg-black-light rounded-b-md">
        <div className="flex items-center content-center justify-between align-middle">
          <div className="flex items-center content-center align-middle">
            <div className="box-border relative w-10 h-10 p-2 mr-2 text-black bg-white border border-white border-solid rounded-full hover:bg-white-hover">
              <svg viewBox="0 0 24 24">
                <path d="M6 4l15 8-15 8z" fill="currentColor"></path>
              </svg>
            </div>
            <AddToMyListButton className="box-border w-10 h-10 p-2 mr-2 duration-200 bg-white border border-solid rounded-full bg-opacity-5 border-grey" />
            <ToggleLikedButton className="box-border relative w-10 h-10 p-2 mr-2 text-white duration-200 bg-white border border-solid rounded-full bg-opacity-5 border-grey hover:border-white trnasition-all" />
            <ToggleDislikedButton className="box-border relative w-10 h-10 p-2 mr-2 text-white duration-200 bg-white border border-solid rounded-full bg-opacity-5 border-grey hover:border-white trnasition-all" />
          </div>
          <MoreInfoButton className="box-border relative w-10 h-10 p-1 duration-200 bg-white border border-solid rounded-full bg-opacity-5 border-grey hover:border-white trnasition-all" />
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
      </div>
    </div>
  );
};

export default memo(PreModalRender);
