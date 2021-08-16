export default function Poster({ id, image, title }) {
  const baseURL = 'https://image.tmdb.org/t/p/original/';

  return (
    <div key={id} className="mr-1 last:mr-12">
      <img
        className={`rounded h-full max-w-poster-sp sm:max-w-poster-sm lg:max-w-poster-lg xl:max-w-poster-xl`}
        src={`${baseURL}${image}`}
        alt={title}
      />
    </div>
  );
}
