export default function Poster({ id, poster_path, title }) {
  const baseURL = 'https://image.tmdb.org/t/p/original/';

  return (
    <div key={id} className="max-w-poster w-full">
      <img src={`${baseURL}${poster_path}`} alt={title} />
    </div>
  );
}
