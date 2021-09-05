import { IMAGE_BASE } from '@services/axios.service';

export default function BoxArtImage({ path }) {
  return (
    <>
      {path ? (
        <img
          className="absolute top-0 bottom-0 left-0 right-0 object-cover object-center w-full h-full rounded"
          src={`${IMAGE_BASE}/w500/${path}`}
          alt="boxart"
        />
      ) : (
        <img
          className="absolute top-0 bottom-0 left-0 right-0 object-cover object-center w-full h-full rounded bg-black-pure"
          alt="boxart"
        />
      )}
    </>
  );
}
