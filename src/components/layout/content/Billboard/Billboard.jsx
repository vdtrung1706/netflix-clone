import DetailModal from '@components/common/DetailModal';
import useSliderItem from '@hooks/useSliderItem';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { IMAGE_BASE } from '@services/axios.service';
import { truncate } from '@utils/convertor.utils';
import { defaultFadeInVariants } from '@utils/motion.utils';
import { AnimatePresence, motion } from 'framer-motion';
import { memo, useState } from 'react';
import { Link } from 'react-router-dom';

function Billboard({ data }) {
  const [modalOpen, setModalOpen] = useState(false);

  const {
    muted,
    inMyList,
    liked,
    disliked,
    toggleDisliked,
    toggleLiked,
    toggleMuted,
    toggleMyList,
  } = useSliderItem(data);

  return (
    <motion.div
      variants={defaultFadeInVariants}
      initial="initial"
      animate="animate"
      className="pb-35% mb-5 select-none"
    >
      <motion.div
        variants={defaultFadeInVariants}
        initial="initial"
        animate="animate"
        className="absolute top-0 z-0 w-full"
      >
        <div className="relative w-full transition-all duration-1000 origin-bottom-left transform-gpu">
          <img
            src={`${IMAGE_BASE}/original${data.backdrop_path}`}
            alt="hero"
            className="w-full bg-repeat-x bg-cover bg-top-center"
          />
          <div className="absolute top-0 left-0 z-0 w-full h-full bg-black bg-opacity-20" />
          <div className="absolute top-0 bottom-0 left-0 right-2/3 opacity-70 bg-gradient-to-r from-black"></div>
          <div className="absolute bottom-0 left-0 right-0 top-auto z-10 h-10 bg-repeat-x bg-0-top bg-gradient-to-t from-black sm:h-20 md:h-32 lg:h-52"></div>
          <div className="absolute right-0 bottom-1/5 flex justify-end items-center md:bottom-35%">
            <span className="flex items-center text-0.7rem border-l-2 border-solid border-white bg-black-lighter bg-opacity-70 pr-5 pl-2 h-5 sm:text-xs lg:h-9 lg:text-base lg:pr-10 lg:pl-3">
              {data.adult ? '18+' : '13+'}
            </span>
          </div>
        </div>
        <div className="absolute top-0 bottom-1/5 left-4% flex flex-col justify-end w-6/12 z-10 md:bottom-35% lg:bottom-40% lg:w-4/12">
          <div className="w-full">
            <div className="relative w-full">
              {data.images?.logos?.length > 0 ? (
                <>
                  <motion.img
                    initial={{
                      transformOrigin: 'bottom left',
                      scale: 1.3,
                      paddingBottom: '20px',
                    }}
                    animate={{
                      transformOrigin: 'bottom left',
                      scale: 1,
                      paddingBottom: '0px',
                      transition: { duration: 1, delay: 7 },
                    }}
                    className="h-28 ml-1/2"
                    src={`${IMAGE_BASE}/w500${data.images?.logos[0].file_path}`}
                    alt=""
                  />
                  <motion.div
                    initial={{
                      transformOrigin: 'bottom left',
                    }}
                    animate={{
                      transformOrigin: 'bottom left',
                      scale: 0,
                      height: 0,
                      opacity: 0,
                      transition: { duration: 1, delay: 7 },
                    }}
                    className="w-full"
                  >
                    <p className="hidden mt-1 overflow-hidden text-xs leading-relaxed sm:block lg:text-base xl:text-lg text-shadow">
                      {truncate(data?.overview, 120)}
                    </p>
                  </motion.div>
                </>
              ) : (
                <>
                  <h1 className="w-full text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-shadow">
                    {data?.title || data?.name || data?.original_name}
                  </h1>
                  <p className="hidden w-full mt-1 overflow-hidden text-xs leading-relaxed sm:block lg:text-base xl:text-lg text-shadow">
                    {truncate(data?.overview, 120)}
                  </p>
                </>
              )}
            </div>
            <div className="flex gap-2 text-0.7rem sm:text-xs md:text-sm lg:text-base mt-4 h-8 md:h-9 lg:h-10">
              <Link
                to={{
                  pathname: '/watch',
                  state: { movie: data },
                }}
                className="flex items-center justify-center w-24 gap-1 transition duration-300 ease-linear bg-white rounded cursor-pointer hover:bg-white-hover md:w-28 md:py-2 text-black-pure"
              >
                <PlayArrowIcon />
                <span className="font-bold">Play</span>
              </Link>
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center justify-center w-32 gap-1 py-2 text-white transition duration-300 ease-linear rounded cursor-pointer hover:bg-grey-darker hover:bg-opacity-60 md:w-36 bg-grey bg-opacity-70"
              >
                <InfoOutlinedIcon />
                <span className="font-medium">More Info</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {modalOpen && (
          <DetailModal
            data={data}
            muted={muted}
            inMyList={inMyList}
            liked={liked}
            disliked={disliked}
            toggleDisliked={toggleDisliked}
            toggleLiked={toggleLiked}
            toggleMyList={toggleMyList}
            toggleMuted={toggleMuted}
            closeModal={() => setModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default memo(Billboard);
