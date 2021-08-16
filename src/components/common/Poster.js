export default function Poster({ id, image, isLarge, title }) {
  const baseURL = 'https://image.tmdb.org/t/p/original/';

  return (
    <div key={id} className="mr-1 last:mr-12">
      <img
        className={`rounded h-full min-h-100px max-w-${isLarge ? 's' : 'ss'}`}
        src={`${baseURL}${image}`}
        alt={title}
      />
    </div>
  );
}
