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
            <button className="box-border absolute top-0 right-0 w-10 h-10 p-2 mx-4 mt-8 text-white duration-200 bg-white border border-solid rounded-full text-opacity-30 opacity-30 hover:text-opacity-100 bg-opacity-5 hover:opacity-100 border-grey hover:border-white trnasition-all">
              <svg viewBox="0 0 24 24">
                <path
                  d="M9 7.828L6.828 10H4v4h2.828L9 16.172V7.828zM11 21l-5-5H2V8h4l5-5v18zm6-10.414l3.293-3.293 1.414 1.414L18.414 12l3.293 3.293-1.414 1.414L17 13.414l-3.293 3.293-1.414-1.414L15.586 12l-3.293-3.293 1.414-1.414L17 10.586z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
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
            <button className="box-border w-10 h-10 p-2 mr-2 duration-200 bg-white border border-solid rounded-full bg-opacity-5 border-grey hover:border-white trnasition-all">
              <svg viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"
                ></path>
              </svg>
            </button>
            <button className="box-border relative w-10 h-10 p-2 mr-2 text-white duration-200 bg-white border border-solid rounded-full bg-opacity-5 border-grey hover:border-white trnasition-all">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M15.167 8.994h3.394l.068.023c1.56.138 2.867.987 2.867 2.73 0 .275-.046.527-.092.78.367.435.596.986.596 1.72 0 .963-.39 1.52-1.032 1.978.023.183.023.252.023.39 0 .963-.39 1.784-1.009 2.243.023.206.023.275.023.39 0 1.743-1.33 2.591-2.89 2.73L12.21 22c-2.04 0-3.05-.252-4.563-.895-.917-.39-1.353-.527-2.27-.619L4 20.371v-8.234l2.476-1.445 2.27-4.427c0-.046.085-1.552.253-4.52l.871-.389c.092-.069.275-.138.505-.184.664-.206 1.398-.252 2.132 0 1.261.436 2.064 1.537 2.408 3.258.142.829.226 1.695.26 2.564l-.008 2zm-4.42-2.246l-2.758 5.376L6 13.285v5.26c.845.113 1.44.3 2.427.72 1.37.58 2.12.735 3.773.735l4.816-.023c.742-.078.895-.3 1.015-.542.201-.4.201-.876 0-1.425.558-.184.917-.479 1.078-.883.182-.457.182-.966 0-1.528.601-.228.901-.64.901-1.238s-.202-1.038-.608-1.32c.23-.46.26-.892.094-1.294-.168-.404-.298-.627-1.043-.738l-.172-.015h-5.207l.095-2.09c.066-1.448-.009-2.875-.216-4.082-.216-1.084-.582-1.58-1.096-1.758-.259-.09-.546-.086-.876.014-.003.06-.081 1.283-.235 3.67z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
            <button className="box-border relative w-10 h-10 p-2 mr-2 text-white duration-200 bg-white border border-solid rounded-full bg-opacity-5 border-grey hover:border-white trnasition-all">
              <svg viewBox="0 0 24 24">
                <path
                  d="M8.833 15.006H5.44l-.068-.023c-1.56-.138-2.867-.987-2.867-2.73 0-.275.046-.527.092-.78C2.23 11.038 2 10.487 2 9.753c0-.963.39-1.52 1.032-1.978-.023-.183-.023-.252-.023-.39 0-.963.39-1.784 1.009-2.243-.023-.206-.023-.275-.023-.39 0-1.743 1.33-2.591 2.89-2.73L11.79 2c2.04 0 3.05.252 4.563.895.917.39 1.353.527 2.27.619L20 3.629v8.234l-2.476 1.445-2.27 4.427c0 .046-.085 1.552-.253 4.52l-.871.389c-.092.069-.275.138-.505.184-.664.206-1.398.252-2.132 0-1.261-.436-2.064-1.537-2.408-3.258a19.743 19.743 0 0 1-.26-2.564l.008-2zm4.42 2.246l2.758-5.376L18 10.715v-5.26c-.845-.113-1.44-.3-2.427-.72C14.203 4.156 13.453 4 11.8 4l-4.816.023c-.742.078-.895.3-1.015.542-.201.4-.201.876 0 1.425-.558.184-.917.479-1.078.883-.182.457-.182.966 0 1.528-.601.228-.901.64-.901 1.238s.202 1.038.608 1.32c-.23.46-.26.892-.094 1.294.168.404.298.627 1.043.738l.172.015h5.207l-.095 2.09c-.066 1.448.009 2.875.216 4.082.216 1.084.582 1.58 1.096 1.758.259.09.546.086.876-.014.003-.06.081-1.283.235-3.67z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
          <button className="box-border relative w-10 h-10 p-1 duration-200 bg-white border border-solid rounded-full bg-opacity-5 border-grey hover:border-white trnasition-all">
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              className="w-full h-full stroke-current"
            >
              <path strokeWidth="4" d="M20 26l11.994 14L44 26"></path>
            </svg>
          </button>
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
