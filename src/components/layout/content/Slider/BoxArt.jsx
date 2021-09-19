import { IMAGE_BASE } from '@services/axios.service';
import { memo } from 'react';

function BoxArt({ path, title }) {
  return (
    <div className="w-full h-full">
      <div className="relative w-full h-full overflow-hidden py-28.125%">
        {path ? (
          <img
            className="absolute top-0 bottom-0 left-0 right-0 object-cover object-center w-full h-full rounded"
            src={`${IMAGE_BASE}/w500${path}`}
            alt={title}
          />
        ) : (
          <div
            className="absolute top-0 bottom-0 left-0 right-0 table w-full h-full rounded bg-black-pure"
            alt={title}
          >
            <div className="table-cell text-xs font-thin text-center text-white align-middle">
              {title}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(BoxArt);
