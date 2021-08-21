import { IMAGE_BASE } from '../../services/requests';
import cx from 'classnames';

const SliderPoster = ({ movie }) => {
  return (
    <div className="w-1/4 relative first:ml-0 inline-block whitespace-normal align-top px-2px transition-transform  ease-linear duration-300 delay-100 cursor-pointer">
      <div className="w-full h-full">
        <div className="w-full h-full relative overflow-hidden py-28.125%">
          <img
            className={cx(
              'absolute top-0 w-full h-full object-cover object-center',
              { 'bg-black-pure': !movie?.backdrop_path }
            )}
            src={`${IMAGE_BASE}/w500/${movie.poster_path}`}
            alt={'box-art'}
          />
        </div>
      </div>
    </div>
  );
};

export default SliderPoster;
