import Layout from '@components/common/Layout';
import SliderItem from '@components/layout/content/Slider/SliderItem';
import { selectMyList } from '@store/user-lists/selectors.user-lists';
import { defaultPageFadeInVariants } from '@utils/motion.utils';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const MyListPage = () => {
  const myList = useSelector(selectMyList);

  return (
    <Layout>
      <motion.div
        variants={defaultPageFadeInVariants}
        initial="initial"
        animate="animate"
        className="mt-20 px-4%"
      >
        <div className="font-bold md:text-sm lg:text-base xl:text-xl">
          My List
        </div>
        <div className="flex flex-wrap items-centers">
          {myList.map((movie) => {
            return (
              <SliderItem key={movie.id} movie={movie} inSearchPage={true} />
            );
          })}
        </div>
      </motion.div>
    </Layout>
  );
};

export default MyListPage;
