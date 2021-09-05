import BoxArtImage from './BoxArtImage';

export default function BoxArt({ movie, large }) {
  return (
    <div className="w-full h-full">
      <div className="relative w-full h-full overflow-hidden py-28.125%">
        {large ? (
          <BoxArtImage path={movie.poster_path} />
        ) : (
          <BoxArtImage path={movie.backdrop_path} />
        )}
      </div>
    </div>
  );
}
