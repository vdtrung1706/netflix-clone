import { useSelector } from 'react-redux';
import SliderItem from '../components/common/SliderItem';

const SearchPage = () => {
  const { loading, inputValue, error, results } = useSelector(
    state => state.search
  );

  return (
    <div className="mt-16 px-4%">
      {loading && <div>Loading...</div>}
      {error && <div>Error ${error}</div>}

      <h1>Results of {inputValue}</h1>

      <div className="flex flex-wrap">
        {results.map(movie => (
          <SliderItem key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
