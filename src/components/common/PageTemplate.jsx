import Layout from '@components/common/Layout';
import Billboard from '@components/layout/content/Billboard/Billboard';
import Sliders from '@components/layout/content/Slider/Sliders';
import SkeletonSliders from '@components/layout/loader/SkeletonSliders';
import useRetrieveData from '@hooks/useRetrieveData';
import { defaultPageFadeInVariants } from '@utils/motion.utils';
import { motion } from 'framer-motion';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PageTemplate = ({
  type = 'MOVIE_PAGE',
  title = 'Netflix',
  billboardUrl = '',
  genresSelector = (state) => state.movies,
  billboardSelector = (state) => state.billboard.movies,
  fetchBillboard = () => {},
  onFetchesSuccess = () => {},
}) => {
  const slidersProps = useRetrieveData(type);
  const genres = useSelector(genresSelector);

  const dispatch = useDispatch();
  const { loading: billboardLoading, data: billboardData } =
    useSelector(billboardSelector);

  useEffect(() => {
    if (!billboardData) {
      dispatch(fetchBillboard(billboardUrl));
    }
  }, [billboardData, billboardUrl, dispatch, fetchBillboard]);

  useEffect(() => {
    handleLoading();

    function handleLoading() {
      const keys = Object.keys(genres);
      for (let key of keys) {
        if (key != 'loading' && genres[key].loading) return;
      }
      if (genres.loading) dispatch(onFetchesSuccess());
    }
  }, [genres, dispatch, onFetchesSuccess]);

  return (
    <Layout title={title}>
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
        {!genres.loading && !billboardLoading && billboardData && slidersProps && (
          <>
            <Billboard data={billboardData} />
            <Sliders slidersProps={slidersProps} type={type} />
          </>
        )}
      </motion.div>
    </Layout>
  );
};

export default memo(PageTemplate);
