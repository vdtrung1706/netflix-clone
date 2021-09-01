import { motion } from 'framer-motion';
import Billboard from '../components/layout/Billboard';
import Slider from '../components/layout/Slider';
import useRetrieveData from '../hooks/useRetrieveData';
import { defaultPageFadeInVariants } from '../utils/motionUtils';

export default function Homepage() {
  const sliders = useRetrieveData('MOVIES');

  return (
    <motion.div
      variants={defaultPageFadeInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col"
    >
      <Billboard type="MOVIE" />

      <div name="slidersWrapper" className="slider-wrapper pt-16">
        {sliders && sliders.map(props => <Slider key={props.id} {...props} />)}
      </div>
    </motion.div>
  );
}
