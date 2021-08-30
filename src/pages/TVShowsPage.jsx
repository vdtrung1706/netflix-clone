import Billboard from '../components/layout/Billboard';
import Slider from '../components/layout/Slider';
import useRetrieveData from '../hooks/useRetrieveData';

const TVShowsPage = () => {
  const sliders = useRetrieveData('TVSHOWS');

  return (
    <div className="flex flex-col">
      <Billboard />
      <div name="slidersWrapper" className="slider-wrapper pt-16">
        {sliders && sliders.map(props => <Slider key={props.id} {...props} />)}
      </div>
    </div>
  );
};

export default TVShowsPage;
