import { memo, forwardRef } from 'react';

const MoreInfoButton = forwardRef(({ className, ...props }, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      className={`${className ? className : 'w-10 h-10'}`}
    >
      <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        className="w-full h-full stroke-current"
      >
        <path strokeWidth="4" d="M20 26l11.994 14L44 26"></path>
      </svg>
      {props.children}
    </button>
  );
});

MoreInfoButton.displayName = 'MoreInfoButton';

export default memo(MoreInfoButton);
