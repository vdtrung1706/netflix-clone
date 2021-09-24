import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
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
        <h1 className="font-bold md:text-sm lg:text-base xl:text-xl">
          {title}
        </h1>
        <div className="w-0 ml-0 text-xs font-medium transition-all duration-700 transform -translate-x-4 opacity-0 group-hover:ml-2 group-hover:translate-x-0 group-hover:w-16 group-hover:opacity-100">
          Explore All
        </div>
        <div className="flex items-baseline font-bold transition-all opacity-0 explore-arrow duration-25">
          <span className="-ml-2 text-2xl font-black lg:-ml-1 font-roboto group-hover:text-xl">
            <KeyboardArrowRightRoundedIcon fontSize="inherit" />
          </span>
        </div>
      </Link>
    );
  }
}

export default SliderTitle;
