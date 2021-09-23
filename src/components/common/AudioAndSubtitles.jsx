import { memo } from 'react';
import CheckIcon from '@mui/icons-material/Check';

const AudioAndSubtitles = () => {
  return (
    <div className="flex pt-3 text-base font-normal h-80 w-116">
      <div className="flex flex-col w-2/3 text-grey-txt">
        <div className="mb-4 ml-10 text-2xl font-bold text-white cursor-default">
          Audio
        </div>
        <button className="flex items-center gap-1 pl-5 text-white transition-all rounded-none duration-25 h-14 hover:bg-white hover:bg-opacity-10">
          <CheckIcon fontSize="inherit" />
          <span>English [Original]</span>
        </button>
        <button className="flex items-center gap-1 pl-5 transition-all rounded-none duration-25 h-14 hover:bg-white hover:bg-opacity-10">
          <CheckIcon fontSize="inherit" className="opacity-0" />
          <span>English - Audio Descriptions</span>
        </button>
      </div>

      <div className="flex flex-col w-1/3 text-grey-txt">
        <div className="mx-auto mb-4 text-2xl font-bold text-white cursor-default">
          Subtitles
        </div>

        <button className="flex items-center gap-1 text-white transition-all rounded-none duration-25 h-14 hover:bg-white hover:bg-opacity-10">
          <CheckIcon fontSize="inherit" />
          <span>English [CC]</span>
        </button>

        <button className="flex items-center gap-1 transition-all rounded-none duration-25 h-14 hover:bg-white hover:bg-opacity-10">
          <CheckIcon fontSize="inherit" className="opacity-0" />
          <span>Off</span>
        </button>
      </div>
    </div>
  );
};

export default memo(AudioAndSubtitles);
