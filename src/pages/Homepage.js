import Banner from '../components/common/Banner';
import Slider from '../components/layout/Slider';
import requests from '../services/requests';
// import Slider from '../components/layout/Slider';
// import { useEffect, useState } from 'react';

export default function Homepage() {
  return (
    <div className="flex flex-col -mt-16">
      <Banner />
      <Slider title="Netflix Original" url={requests.netflixOrignals} />
      <Slider title="Trending" url={requests.trending} />
    </div>
  );
}
