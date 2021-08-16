export default function Poster({ id, image, isLarge, title }) {
  const baseURL = 'https://image.tmdb.org/t/p/original/';

  return (
    <div key={id} className="mr-1">
      <img
        className={`rounded h-full max-w-poster-${isLarge ? '300' : '200'}`}
        src={`${baseURL}${image}`}
        alt={title}
      />
    </div>
  );
}
