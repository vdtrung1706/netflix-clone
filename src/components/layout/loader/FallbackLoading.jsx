import SkeletonLoading from './SkeletonSliders';

const FallbackLoading = ({ location }) => {
  if (
    location.includes('/browse') ||
    location.includes('/search') ||
    location.includes('/latest') ||
    location.includes('/kids')
  ) {
    return (
      <div className="py-20">
        <SkeletonLoading />
      </div>
    );
  }

  return null;
};

export default FallbackLoading;
