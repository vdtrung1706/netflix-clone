import Layout from '@components/common/Layout';
import SliderItem from '@components/layout/content/Slider/SliderItem';
import useViewport from '@hooks/useViewport';
import { defaultPageFadeInVariants, staggerHalf } from '@utils/motion.utils';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function SearchPage() {
  const { loading, error, results } = useSelector((state) => state.search);
  const { width } = useViewport();
  const titleNum = results.length >= 10 ? 10 : results.length;

  useEffect(() => {}, [width]);

  return (
    <Layout>
      <motion.div
        variants={defaultPageFadeInVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="mt-36 px-4%"
      >
        {loading && !results && <div>Loading...</div>}
        {error && !results && <div>Error ${error}</div>}
        {results.length > 0 ? (
          <>
            <div className="flex flex-wrap items-center gap-2 mx-4 text-sm font-light font-roboto">
              <span className="font-normal text-grey-txt">
                Explore titles related to:
              </span>
              {results.slice(0, titleNum - 1).map(({ title }, idx) => {
                if (title)
                  return (
                    <>
                      <span>{title}</span>
                      <span className="font-thin font-main">
                        {idx === titleNum - 1 ? '' : '|'}
                      </span>
                    </>
                  );
              })}
            </div>
            <motion.div
              variants={staggerHalf}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-wrap items-centers"
            >
              {results.map((movie) => {
                return (
                  <SliderItem
                    key={movie.id}
                    movie={movie}
                    inSearchPage={true}
                  />
                );
              })}
            </motion.div>
          </>
        ) : (
          <div>
            Sorry, we did not found any movie or tv-show with that title.
          </div>
        )}
      </motion.div>
    </Layout>
  );
}
