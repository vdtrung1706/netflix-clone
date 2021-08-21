import Banner from '../components/common/Banner';
import { Slider } from '../components/layout/Slider';
// import Slider from '../components/layout/Slider';
// import { useEffect, useState } from 'react';

export default function Homepage() {
  return (
    <div className="flex flex-col -mt-16">
      <Banner />
      <Slider title="Netflix Original" />
      <Slider title="Netflix Original" />
    </div>
  );
}
