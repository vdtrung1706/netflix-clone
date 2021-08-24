import Banner from '../components/layout/banner';
import Slider from '../components/layout/slider';
import requests from '../services/requests';

function Homepage() {
  return (
    <div className="flex flex-col -mt-16">
      <Banner />
      <Slider title="Netflix Original" url={requests.netflixOrignals} />
    </div>
  );
}

export default Homepage;
