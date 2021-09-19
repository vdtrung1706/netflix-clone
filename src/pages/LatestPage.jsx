import Layout from '@components/common/Layout';
import Billboard from '@components/layout/content/Billboard/Billboard';
import Slider from '@components/layout/content/Slider/Slider';
import SkeletonSliders from '@components/layout/loader/SkeletonSliders';
import useRetrieveData from '@hooks/useRetrieveData';
import { latestRequests } from '@services/requests.service';
import { selectBillboardLatest } from '@store/billboard/billboard.selectors';
import { fetchBillboardLatest } from '@store/billboard/billboard.slice';
import { latestActions } from '@store/latest/slice.latest';
import { defaultPageFadeInVariants } from '@utils/motion.utils';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function LatestPage() {
  const sliders = useRetrieveData('LATEST');

  const dispatch = useDispatch();
  const genres = useSelector((state) => state.latest);

  const { loading: billboardLoading, data: billboardData } = useSelector(
    selectBillboardLatest,
  );

  useEffect(() => {
    if (!billboardData) {
      dispatch(fetchBillboardLatest(latestRequests.newRelease.url));
    }
  }, [billboardData, dispatch]);

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
        className="flex flex-col"
      >
        {genres.loading || billboardLoading ? (
          <div className="py-20">
            <SkeletonSliders />
          </div>
        ) : null}
        {!genres.loading && !billboardLoading && billboardData && (
          <>
            <Billboard data={billboardData} />
            {sliders && (
              <div className="pt-12 slider-wrapper">
                {sliders.map((props) => (
                  <Slider key={props.id} {...props} isMovie={true} />
                ))}
              </div>
            )}
          </>
        )}
      </motion.div>
    </Layout>
  );
}
