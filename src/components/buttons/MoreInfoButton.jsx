import { memo, forwardRef } from 'react';

const MoreInfoButton = forwardRef(({ className, isMore, ...props }, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      className={`${className ? className : 'w-10 h-10'}`}
    >
      <svg viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d={
            isMore
              ? 'M5.65 16.076l-1.3-1.518L12 8l7.65 6.558-1.3 1.518L12 10.634z'
              : 'M5.689 7.924L4.387 9.442 12.038 16l7.651-6.558-1.302-1.518-6.349 5.442z'
          }
        ></path>
      </svg>
      {props.children}
    </button>
  );
});

MoreInfoButton.displayName = 'MoreInfoButton';

export default memo(MoreInfoButton);
