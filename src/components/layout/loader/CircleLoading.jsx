import { forwardRef } from 'react';
import { SPINNER } from '@assets';

const CircleLoading = forwardRef(({ className }, ref) => {
  return (
    <div ref={ref} className={className}>
      <img
        className="w-full bg-center bg-no-repeat bg-cover motion-safe:animate-spin"
        src={SPINNER}
        alt="spinner"
      />
    </div>
  );
});

CircleLoading.displayName = 'CircleLoading';

export default CircleLoading;
