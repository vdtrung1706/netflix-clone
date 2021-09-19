import Layout from '@components/common/Layout';
import Billboard from '@components/layout/content/Billboard/Billboard';
import Slider from '@components/layout/content/Slider/Slider';
import SkeletonSliders from '@components/layout/loader/SkeletonSliders';
import useRetrieveData from '@hooks/useRetrieveData';
import { moviesRequests } from '@services/requests.service';
import { selectBillboardMovie } from '@store/billboard/billboard.selectors';
import { fetchBillboardMovie } from '@store/billboard/billboard.slice';
import { moviesActions } from '@store/movies/slice.movies';
import { defaultPageFadeInVariants } from '@utils/motion.utils';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Homepage() {
  const sliders = useRetrieveData('MOVIES');
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.movies);
  const { loading: billboardLoading, data: billboardData } =
    useSelector(selectBillboardMovie);

  useEffect(() => {
    if (!billboardData) {
      dispatch(fetchBillboardMovie(moviesRequests.adventureMovies.url));
    }
  }, [billboardData, dispatch]);

  useEffect(() => {
    handleLoading();

    function handleLoading() {
      const keys = Object.keys(genres);
      for (let key of keys) {
        if (key != 'loading' && genres[key].loading) return;
      }
      if (genres.loading) dispatch(moviesActions.onFetchesSuccess());
    }
  }, [dispatch, genres]);

  return (
    <Layout title="Home - Netflix">
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
        {!genres.loading && !billboardLoading && billboardData && sliders && (
          <>
            <Billboard data={billboardData} />
            <div className="pt-12 slider-wrapper">
              {sliders.map((props, idx) => {
                if (idx == 1) {
                  return (
                    <div key={props.id}>
                      <Slider
                        {...props}
                        isMyList={true}
                        type="MYLIST"
                        title="My List"
                      />
                      <Slider {...props} />
                    </div>
                  );
                }
                return <Slider key={props.id} {...props} />;
              })}
            </div>
          </>
        )}
      </motion.div>
    </Layout>
  );
}
