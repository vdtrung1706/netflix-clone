import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PureComponent } from 'react';
import { Link } from 'react-router-dom';

class SliderTitle extends PureComponent {
  render() {
    const { title, genreId } = this.props;

    return (
      <Link
        to={`/browse?genre=${genreId}`}
        className="mx-4% px-1 mb-1 lg:mb-2 flex items-baseline cursor-pointer whitespace-nowrap w-max group"
      >
        <h1 className="font-bold md:text-sm lg:text-base xl:text-xl">
          {title}
        </h1>
        <div className="w-0 ml-0 text-xs font-medium transition-all duration-700 transform -translate-x-4 opacity-0 group-hover:ml-2 group-hover:translate-x-0 group-hover:w-16 group-hover:opacity-100">
          Explore All
        </div>
        <div className="explore-arrow flex opacity-0 duration-25 items-baseline ml-1 font-bold transition-all group-hover:ml-0 group-hover:text-0.7rem sm:text-sm lg:text-base xl:text-base">
          <span>
            <FontAwesomeIcon icon={faChevronRight} />
          </span>
        </div>
      </Link>
    );
  }
}

export default SliderTitle;
