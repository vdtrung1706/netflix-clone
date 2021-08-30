import Slider from '../components/layout/Slider';
import useRetrieveData from '../hooks/useRetrieveData';

const LatestPage = () => {
  const sliders = useRetrieveData('LATEST');

  return (
    <div className="flex flex-col">
      <div name="slidersWrapper" className="slider-wrapper pt-16">
        {sliders && sliders.map(props => <Slider key={props.id} {...props} />)}
      </div>
    </div>
  );
};

export default LatestPage;
