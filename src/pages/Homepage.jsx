import { Banner, Slider } from '../components/layout';
import requests from '../services/requests';

export default function Homepage() {
  return (
    <div className="flex flex-col -mt-16">
      <Banner />
      <Slider title="Netflix Original" url={requests.netflixOrignals} />
      <Slider title="Trending" url={requests.trending} />
    </div>
  );
}
