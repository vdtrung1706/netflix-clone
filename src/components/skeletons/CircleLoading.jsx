import { SPINNER } from '../../assets';

export default function CircleLoading() {
  return (
    <div className="absolute z-75 bg-transparent select-none w-1/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:w-1/4 lg:w-1/6">
      <img
        className="w-full bg-no-repeat bg-center bg-cover motion-safe:animate-spin"
        src={SPINNER}
        alt="spinner"
      />
    </div>
  );
}
