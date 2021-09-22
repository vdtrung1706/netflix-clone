import { memo } from 'react';

const SpeedAdjustment = () => {
  return (
    <div className="h-32 p-4 text-xl font-normal cursor-pointer min-w-550px">
      <div className="text-2xl font-bold cursor-default">Playback Speed</div>
      <div className="flex items-center justify-between h-px mx-2 my-8 bg-white-darker">
        <div className="relative">
          <div className="w-3 h-3 rounded-full bg-white-darker"></div>
          <div className="absolute top-8 whitespace-nowrap">0.5x</div>
        </div>

        <div className="relative">
          <div className="w-3 h-3 rounded-full bg-white-darker"></div>
          <div className="absolute -translate-x-1/2 top-8 transform-gpu whitespace-nowrap">
            0.75x
          </div>
        </div>

        <div className="relative w-8 h-8 border-4 rounded-full border-grey-txt bg-black-lighter">
          <div className="absolute w-4 h-4 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full top-1/2 left-1/2">
            <div className="absolute -translate-x-1/2 top-8 transform-gpu whitespace-nowrap">
              <span>1x</span>
              <b className="ml-1">(Normal)</b>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="w-3 h-3 rounded-full bg-white-darker"></div>
          <div className="absolute -translate-x-1/2 top-8 transform-gpu whitespace-nowrap">
            1.25x
          </div>
        </div>
        <div className="relative">
          <div className="w-3 h-3 rounded-full bg-white-darker"></div>
          <div className="absolute right-0 top-8 whitespace-nowrap">1.5x</div>
        </div>
      </div>
    </div>
  );
};

export default memo(SpeedAdjustment);
