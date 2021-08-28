export const ButtonDefault = ({ className, ...props }) => {
  return (
    <button
      className={`block font-bold text-white bg-red rounded hover:bg-red-hover ${className}`}
      {...props}
    >
      {props.children}
    </button>
  );
};
