import { IMAGE_BASE } from '@services/axios.service';
import React from 'react';

function BoxArtImage({ path, title }) {
  return (
    <>
      {path ? (
        <img
          className="absolute top-0 bottom-0 left-0 right-0 object-cover object-center w-full h-full rounded"
          src={`${IMAGE_BASE}/w500/${path}`}
          alt={title}
        />
      ) : (
        <img
          className="absolute top-0 bottom-0 left-0 right-0 object-cover object-center w-full h-full rounded bg-black-pure"
          alt={title}
        />
      )}
    </>
  );
}

export default React.memo(BoxArtImage);
