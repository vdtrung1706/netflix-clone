import { BASE_IMG_URL } from '../../services/requests';

export default function Poster({ id, image, title }) {
  return (
    <div key={id} className="mr-1 last:mr-12">
      <img
        className={`rounded h-full max-w-poster-sp sm:max-w-poster-sm lg:max-w-poster-lg xl:max-w-poster-xl`}
        src={`${BASE_IMG_URL}${image}`}
        alt={title}
      />
    </div>
  );
}
