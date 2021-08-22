import { useState } from 'react';
import { useViewport } from '../../hooks';
import { IMAGE_BASE } from '../../services/api';
import cx from 'classnames';

function SliderItem({ movie }) {
  const [zIndex, setZIndex] = useState(11);
  const [onHover, setOnHover] = useState(false);
  const { width } = useViewport();

  const onMouseEnter = () => {
    setTimeout(() => setZIndex(50), 100);
    setOnHover(true);
  };

  const onMouseLeave = () => {
    setOnHover(false);
    setTimeout(() => setZIndex(11), 100);
  };

  return (
    <div
      className={cx(
        `w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 2xl:w-1/6 relative overflow-y-hidden cursor-pointer first:ml-0 inline-block px-2px box-border transition-transform ease-in-out ${
          onHover ? 'duration-75 delay-1000' : 'delay-75 duration-25'
        }`,
        {
          'hover:transform hover:scale-x-125 hover:scale-y-125':
            onHover && width > 640,
        }
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ zIndex }}
    >
      <div className="w-full h-full">
        <div className="w-full h-full relative overflow-hidden py-28.125%">
          <img
            className={cx(
              'absolute rounded top-0 w-full h-full object-cover object-center',
              {
                'bg-black-pure': !movie?.backdrop_path,
              }
            )}
            src={`${IMAGE_BASE}/w500/${movie.poster_path}`}
            alt={'box-art'}
          />
        </div>
      </div>
    </div>
  );
}

export default SliderItem;