import Slider from './Slider';
import { memo } from 'react';

const Sliders = ({ slidersProps = [], type = 'MOVIES' }) => {
  return (
    <div className="pt-12">
      {slidersProps.map((props, index) => {
        if (index === 1 && type !== 'LATEST') {
          return (
            <div key={props.id}>
              <Slider
                {...props}
                isMyList={true}
                type="MYLIST"
                title="My List"
              />
              <Slider {...props} />
            </div>
          );
        }
        return <Slider key={props.id} {...props} />;
      })}
    </div>
  );
};

export default memo(Sliders);
