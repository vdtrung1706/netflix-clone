import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from '../components/layout/Slider';
import SkeletonSliders from '../components/skeletons/SkeletonSliders';
import useRetrieveData from '../hooks/useRetrieveData';
import { latestSlice } from '../redux/devtools/latestSlice';
import { defaultPageFadeInVariants } from '../utils/motionUtils';

export default function LatestPage() {
  const sliders = useRetrieveData('LATEST');

  const dispatch = useDispatch();
  const genres = useSelector(state => state.latest);

  useEffect(() => {
    handleLoading();

    function handleLoading() {
      const keys = Object.keys(genres);
      for (let key of keys) {
        if (key != 'loading' && genres[key].loading) return;
      }
      if (genres.loading) dispatch(latestSlice.actions.onFetchesSuccess());
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
          <div name="slidersWrapper" className="slider-wrapper pt-16">
            {sliders &&
              sliders.map(props => <Slider key={props.id} {...props} />)}
          </div>
        </>
      )}
    </motion.div>
  );
}
