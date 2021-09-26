import { PureComponent } from 'react';
import { Link } from 'react-router-dom';

class SliderTitle extends PureComponent {
  render() {
    const { title, genre, url, isMyList } = this.props;

    return (
      <Link
        to={{
          pathname: isMyList ? '/browse/my-list' : `/browse/genre/${genre}`,
          state: { title, url },
        }}
        className="mx-4% px-1 mb-1 lg:mb-2 flex items-baseline cursor-pointer whitespace-nowrap w-max group"
      >
        <h1 className="text-xs font-bold sm:text-sm lg:text-base xl:text-lg 2xl:text-xl">
          {title}
        </h1>
        <div className="w-0 ml-0 text-xs font-medium transition-all duration-700 transform -translate-x-4 opacity-0 group-hover:ml-2 group-hover:translate-x-0 group-hover:w-16 group-hover:opacity-100">
          Explore All
        </div>
        <div className="flex items-baseline ml-1 transition-all opacity-0 explore-arrow duration-25">
          <span className="text-sm font-black lg:text-base xl:text-xl 2xl:text-2xl">
            ›
          </span>
        </div>
      </Link>
    );
  }
}

export default SliderTitle;
