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
        className="mx-4% px-1 mb-1 lg:mb-2 flex items-baseline cursor-pointer whitespace-nowrap w-max"
      >
        <h1 className="text-font-medium md:text-sm lg:text-base xl:text-xl">
          {title}
        </h1>

        <div className="flex items-baseline w-0 ml-1 text-xs font-medium transition-all duration-300 delay-100 opacity-0 group-hover:transform group-hover:w-auto group-hover:opacity-100 group-hover:translate-x-3">
          <span>Explore All</span>
          <span className="ml-2px">
            <FontAwesomeIcon icon={faChevronRight} />
          </span>
        </div>
      </Link>
    );
  }
}

export default SliderTitle;
