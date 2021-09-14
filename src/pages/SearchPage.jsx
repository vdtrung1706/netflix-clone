import { Layout } from '@components/common';
import { SliderItem } from '@components/layout';
import useViewport from '@hooks/useViewport';
import { defaultPageFadeInVariants, staggerHalf } from '@utils/motion.utils';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function SearchPage() {
  const { loading, error, results } = useSelector((state) => state.search);
  const { width } = useViewport();

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
        <motion.div
          variants={staggerHalf}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex flex-wrap"
        >
          {results.length > 0 ? (
            <>
              {results.map((movie) => {
                return (
                  <SliderItem
                    key={movie.id}
                    movie={movie}
                    inSearchPage={true}
                  />
                );
              })}
            </>
          ) : (
            <div>
              Sorry, we did not found any movie or tv-show with that title.
            </div>
          )}
        </motion.div>
      </motion.div>
      <div className="pt-20 h-96 px-4%">footer</div>
    </Layout>
  );
}
