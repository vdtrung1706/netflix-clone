import Billboard from '../components/layout/Billboard';
import Slider from '../components/layout/Slider';
import useRetrieveData from '../hooks/useRetrieveData';

const MoviesPage = () => {
  const slidersInfo = useRetrieveData('MOVIES');

  return (
    <div className="flex flex-col -mt-16">
      <Billboard />
      {slidersInfo &&
        slidersInfo.map(props => <Slider key={props.id} {...props} />)}
    </div>
  );
};

export default MoviesPage;
