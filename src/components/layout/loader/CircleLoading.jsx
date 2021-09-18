import { SPINNER } from '@assets';

export default function CircleLoading({ className }) {
  return (
    <div className={className}>
      <img
        className="w-full bg-center bg-no-repeat bg-cover motion-safe:animate-spin"
        src={SPINNER}
        alt="spinner"
      />
    </div>
  );
}
