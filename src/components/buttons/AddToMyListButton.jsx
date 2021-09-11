import { memo } from 'react';

function AddToMyListButton({
  inMyList,
  className,
  onClick = () => {},
  ...props
}) {
  return (
    <button
      {...props}
      onClick={onClick}
      className={`${className ? className : 'w-10 h-10 border border-red'}`}
    >
      <svg viewBox="0 0 24 24" className="transition-all duration-700">
        <path
          fill="currentColor"
          d={
            inMyList
              ? 'M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z'
              : 'M13 11h8v2h-8v8h-2v-8H3v-2h8V3h2v8z'
          }
        />
      </svg>
      {props.children}
    </button>
  );
}

export default memo(AddToMyListButton);
