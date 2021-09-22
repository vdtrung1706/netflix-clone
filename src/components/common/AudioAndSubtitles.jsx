import { memo } from 'react';

const AudioAndSubtitles = () => {
  return (
    <div className="flex pt-3 text-base font-normal h-80 w-116">
      <div className="flex flex-col w-2/3 text-grey-txt">
        <div className="mb-4 ml-10 text-2xl font-bold text-white cursor-default">
          Audio
        </div>

        <button className="flex items-center gap-1 text-white transition-all rounded-none duration-25 h-14 hover:bg-white hover:bg-opacity-10">
          <div className="w-3 h-3 ml-6">
            <svg viewBox="0 0 24 24" className="transition-all duration-700">
              <path
                fill="currentColor"
                d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"
              />
            </svg>
          </div>
          <span>English [Original]</span>
        </button>

        <button className="flex items-center gap-1 transition-all rounded-none duration-25 h-14 hover:bg-white hover:bg-opacity-10">
          <div className="w-3 h-3 ml-6 opacity-0">
            <svg viewBox="0 0 24 24" className="transition-all duration-700">
              <path
                fill="currentColor"
                d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"
              />
            </svg>
          </div>
          <span>English - Audio Descriptions</span>
        </button>
      </div>

      <div className="flex flex-col w-1/3 text-grey-txt">
        <div className="mb-4 ml-10 text-2xl font-bold text-white cursor-default">
          Subtitles
        </div>

        <button className="flex items-center gap-1 text-white transition-all rounded-none duration-25 h-14 hover:bg-white hover:bg-opacity-10">
          <div className="w-3 h-3 ml-6">
            <svg viewBox="0 0 24 24" className="transition-all duration-700">
              <path
                fill="currentColor"
                d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"
              />
            </svg>
          </div>
          <span>English [CC]</span>
        </button>

        <button className="flex items-center gap-1 transition-all rounded-none duration-25 h-14 hover:bg-white hover:bg-opacity-10">
          <div className="w-3 h-3 ml-6 opacity-0">
            <svg viewBox="0 0 24 24" className="transition-all duration-700">
              <path
                fill="currentColor"
                d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"
              />
            </svg>
          </div>
          <span>Off</span>
        </button>
      </div>
    </div>
  );
};

export default memo(AudioAndSubtitles);
