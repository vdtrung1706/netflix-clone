import { motion } from 'framer-motion';
import Slider from '../components/layout/Slider';
import useRetrieveData from '../hooks/useRetrieveData';
import { defaultPageFadeInVariants } from '../utils/motionUtils';

export default function LatestPage() {
  const sliders = useRetrieveData('LATEST');

  return (
    <motion.div
      variants={defaultPageFadeInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col"
    >
      <div name="slidersWrapper" className="slider-wrapper pt-16">
        {sliders && sliders.map(props => <Slider key={props.id} {...props} />)}
      </div>
    </motion.div>
  );
}
