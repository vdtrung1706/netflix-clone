import { Popper } from '@material-ui/core';
import { motion, AnimatePresence } from 'framer-motion';
import { IMAGE_BASE } from '../../services/axios';
import { defaultEasing } from '../../utils/motionUtils';

export const smallPreviewFadeInVariants = {
  initial: {
    opacity: 0,
    translateY: '-70%',
    scale: 0,
    transition: { duration: 0.6, ease: defaultEasing },
    willChange: 'opacity, transform',
  },
  animate: {
    opacity: 1,
    translateY: '-70%',
    scale: 1,
    transition: { duration: 0.6, ease: defaultEasing },
    willChange: 'opacity, transform',
  },
  exit: {
    opacity: 0,
    translateY: '-70%',
    scale: 0.65,
    transition: { delay: 0.25, duration: 0.4, ease: defaultEasing },
    willChange: 'opacity, transform',
  },
};

export default function SliderItemPopper({
  movie,
  anchorEl,
  open,
  handleClose,
}) {
  return (
    <AnimatePresence>
      {open && (
        <Popper
          name="smallPreview"
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          placement="bottom"
        >
          <motion.div
            variants={smallPreviewFadeInVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onMouseLeave={handleClose}
            className="flex flex-col transform rounded-md cursor-pointer select-none -translate-y-2/3 w-350px bg-black-light"
          >
            <div className="w-full">
              {movie?.backdrop_path ? (
                <img
                  src={`${IMAGE_BASE}/w500/${movie.backdrop_path}`}
                  alt="small-preview-player"
                  className="object-cover object-center rounded-t-md"
                />
              ) : (
                <video
                  className="object-cover object-center w-full h-auto"
                  src="https://designsupply-web.com/samplecontent/vender/codepen/20181014.mp4"
                  loop
                  muted
                  autoPlay
                />
              )}
            </div>

            <div className="p-4 cursor-pointer">
              <div className="flex items-center content-center justify-between align-middle">
                <div className="flex items-center content-center align-middle">
                  <div className="box-border relative w-10 h-10 p-2 mr-2 bg-white border-2 border-white border-solid rounded-full c">
                    <svg
                      className="w-full h-full overflow-hidden"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 64 64"
                    >
                      <path d="M6 2l52 30L6 62V2z"></path>
                    </svg>
                  </div>
                  <div
                    className="box-border relative w-10 h-10 p-1 mr-2 bg-white border-2 border-solid rounded-full bg-opacity-5 border-grey"
                    data-tooltip="Add to My List"
                  >
                    <svg
                      className="w-full h-full stroke-current stroke-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 64 64"
                    >
                      <path strokeWidth="4" d="M32 16v32m16-16H16"></path>
                    </svg>
                  </div>
                  <div
                    data-tooltip="I like this"
                    className="box-border relative w-10 h-10 p-2 mr-2 bg-white border-2 border-solid rounded-full bg-opacity-5 border-grey"
                  >
                    <svg
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 64 64"
                      className="w-full h-full stroke-current"
                    >
                      <path
                        strokeWidth="4"
                        d="M54 35h2a4 4 0 1 0 0-8H34a81 81 0 0 0 2-18 4 4 0 0 0-8 0s-4 22-18 22H4v24h10c4 0 12 4 16 4h20a4 4 0 0 0 0-8h2a4 4 0 0 0 0-8h2a4 4 0 0 0 0-8"
                      ></path>
                    </svg>
                  </div>
                  <div
                    className="box-border relative w-10 h-10 p-2 mr-2 text-white bg-white border-2 border-solid rounded-full bg-opacity-5 border-grey"
                    data-tooltip="Not for me"
                  >
                    <svg
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 64 64"
                      className="w-full h-full stroke-current"
                    >
                      <path
                        strokeWidth="4"
                        d="M10 29H8a4 4 0 0 0 0 8h22a81 81 0 0 0-2 18 4 4 0 0 0 8 0s4-22 18-22h6V9H50c-4 0-12-4-16-4H14a4 4 0 0 0 0 8h-2a4 4 0 0 0 0 8h-2a4 4 0 0 0 0 8"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div
                  className="box-border relative w-10 h-10 p-1 bg-white border-2 border-solid rounded-full bg-opacity-5 border-grey"
                  data-tooltip="More info"
                >
                  <svg
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    className="w-full h-full stroke-current"
                  >
                    <path strokeWidth="4" d="M20 26l11.994 14L44 26"></path>
                  </svg>
                </div>
              </div>

              <div className="flex items-center content-center my-4 text-base font-semibold align-middle">
                <div className=" text-green">98% match</div>
                <div className="px-2 mx-2 border border-white border-solid">
                  18+
                </div>
                <div className="">1h 42m</div>
                <div className="px-2 mx-2 text-xs font-normal border border-white border-solid rounded">
                  HD
                </div>
              </div>

              <div className="flex flex-wrap items-center content-center justify-start gap-1 my-4 text-base font-semibold text-center align-middle">
                <div className="my-1">Action</div>
                <span className="opacity-40">•</span>
                <div className="my-1">Drama</div>
                <span className="opacity-40">•</span>
                <div className="my-1">Thriller</div>
              </div>
            </div>
          </motion.div>
        </Popper>
      )}
    </AnimatePresence>
  );
}
