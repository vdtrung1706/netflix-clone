import { useSelector } from 'react-redux';
import SliderItem from '../components/common/SliderItem';

const SearchPage = () => {
  const { loading, error, results } = useSelector(state => state.search);

  return (
    <div className="mt-36 px-4%">
      {loading && <div>Loading...</div>}
      {error && <div>Error ${error}</div>}

      <div className="flex flex-wrap">
        {results.length === 0 && (
          <h4>
            Sorry, we but we did not found any movie or tv-show with that title.
          </h4>
        )}
        {!loading &&
          results.length > 0 &&
          results.map(movie => (
            <SliderItem key={movie.id} movie={movie} inSearchPage={true} />
          ))}
      </div>
    </div>
  );
};

export default SearchPage;
