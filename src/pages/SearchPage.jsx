import { Layout } from '@components/common';
import { SliderItem } from '@components/layout';
import { defaultPageFadeInVariants, staggerHalf } from '@utils/motion.utils';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

export default function SearchPage() {
  const { loading, error, results } = useSelector((state) => state.search);

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
          {results && results.length > 0 ? (
            results.map((movie) => (
              <SliderItem key={movie.id} movie={movie} inSearchPage={true} />
            ))
          ) : (
            <h4>
              Sorry, we did not found any movie or tv-show with that title.
            </h4>
          )}
        </motion.div>
      </motion.div>
    </Layout>
  );
}
