import Slider from './Slider';
import { memo } from 'react';

const Sliders = ({ slidersProps = [], type = 'MOVIE_PAGE' }) => {
  return (
    <div className="pt-12">
      {slidersProps.map((props, index) => {
        if (index === 1 && type !== 'LATEST_PAGE') {
          return (
            <div key={props.id}>
              <Slider
                {...props}
                isMyList={true}
                large={false}
                type={type}
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
