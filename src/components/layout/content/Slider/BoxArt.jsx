import { memo } from 'react';
import BoxArtImage from './BoxArtImage';

function BoxArt({ path, title }) {
  return (
    <div className="w-full h-full">
      <div className="relative w-full h-full overflow-hidden py-28.125%">
        <BoxArtImage path={path} title={title} />
      </div>
    </div>
  );
}

export default memo(BoxArt);
