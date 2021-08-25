import Banner from '../components/layout/banner';
import Slider from '../components/layout/slider';
import useRetrieveData from '../hooks/use-retrieve-data';

function Homepage() {
  const sliders = useRetrieveData('MOVIES');

  console.log(sliders);

  return (
    <div className="flex flex-col -mt-16">
      <Banner />

      {sliders && sliders.map(props => <Slider key={props.id} {...props} />)}
    </div>
  );
}

export default Homepage;
