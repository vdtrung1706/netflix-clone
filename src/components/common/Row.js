import Poster from './Poster';
import useFetch from '../../hooks/useFetch';

export default function Row({ title, fetchUrl, isLarge }) {
  const [response, loading, error] = useFetch(fetchUrl);

  return (
    <div className="flex items-start flex-col py-4 pr-0 pl-11">
      <h3 className="text-sm md:text-sm lg:text-base xl:text-xl font-bold mb-2">
        {title}
      </h3>

      {loading && <div>Loading...</div>}
      {error && <div>Error !!! </div>}

      <div className="flex overflow-x-hidden items-center max-w-full">
        {response.map(({ id, poster_path, backdrop_path, title }) => {
          const props = {
            id,
            title,
            isLarge,
            image: isLarge ? poster_path : backdrop_path,
          };
          return <Poster key={id} {...props} />;
        })}
      </div>
    </div>
  );
}
