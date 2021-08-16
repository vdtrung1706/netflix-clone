import Poster from './Poster';
import useFetch from '../../hooks/useFetch';

export default function Row({ title, fetchUrl }) {
  const [response, loading, error] = useFetch(fetchUrl);

  return (
    <div className="flex items-start flex-col">
      <h3 className="text-3xl font-normal leading-normal mt-0 mb-2">{title}</h3>
      {loading && <div>Loading...</div>}
      {error && <div>Error !!! </div>}
      <div className="flex">
        {response.map(({ id, poster_path, title }) => {
          const props = { id, poster_path, title };
          return <Poster key={id} {...props} />;
        })}
      </div>
    </div>
  );
}
