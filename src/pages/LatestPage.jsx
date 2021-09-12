import { Layout } from '@components/common';
import { SkeletonSliders, Slider } from '@components/layout';
import useRetrieveData from '@hooks/useRetrieveData';
import { latestActions } from '@store/latest/slice.latest';
import { defaultPageFadeInVariants } from '@utils/motion.utils';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function LatestPage() {
  const sliders = useRetrieveData('LATEST');

  const dispatch = useDispatch();
  const genres = useSelector((state) => state.latest);

  useEffect(() => {
    handleLoading();

    function handleLoading() {
      const keys = Object.keys(genres);
      for (let key of keys) {
        if (key != 'loading' && genres[key].loading) return;
      }
      if (genres.loading) dispatch(latestActions.onFetchesSuccess());
    }
  }, [dispatch, genres]);

  return (
    <Layout>
      <motion.div
        variants={defaultPageFadeInVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex flex-col"
      >
        {genres.loading && (
          <div className="pt-20">
            <SkeletonSliders />
          </div>
        )}
        {!genres.loading && (
          <>
            <div className="pt-12 slider-wrapper">
              {sliders &&
                sliders.map((props) => <Slider key={props.id} {...props} />)}
            </div>
          </>
        )}
      </motion.div>
    </Layout>
  );
}
