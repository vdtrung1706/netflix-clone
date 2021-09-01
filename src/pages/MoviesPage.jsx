import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Billboard from '../components/layout/Billboard';
import Slider from '../components/layout/Slider';
import SkeletonSliders from '../components/skeletons/SkeletonSliders';
import useRetrieveData from '../hooks/useRetrieveData';
import { moviesSlice } from '../redux/devtools/moviesSlice';
import { defaultPageFadeInVariants } from '../utils/motionUtils';

export default function MoviesPage() {
  const sliders = useRetrieveData('MOVIES');
  const dispatch = useDispatch();
  const genres = useSelector(state => state.movies);

  useEffect(() => {
    handleLoading();

    function handleLoading() {
      const keys = Object.keys(genres);
      for (let key of keys) {
        if (key != 'loading' && genres[key].loading) return;
      }
      if (genres.loading) dispatch(moviesSlice.actions.onFetchesSuccess());
    }
  }, [dispatch, genres]);

  return (
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
          <Billboard type="MOVIE" />

          <div name="slidersWrapper" className="slider-wrapper pt-16">
            {sliders &&
              sliders.map(props => <Slider key={props.id} {...props} />)}
          </div>
        </>
      )}
    </motion.div>
  );
}
