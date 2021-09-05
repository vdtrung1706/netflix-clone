export default function SkeletonSliders() {
  return (
    <div className={`animate-pulse flex flex-col gap-3 w-full`}>
      <div className="mx-4% h-7 w-28 bg-black-light"></div>
      <div className="flex gap-1 px-4% h-32 md:h-36">
        <div className="w-1/2 h-full rounded-sm bg-black-lighter sm:w-2/6 lg:w-1/4 xl:w-1/5"></div>
        <div className="w-1/2 h-full rounded-sm bg-black-lighter sm:w-2/6 lg:w-1/4 xl:w-1/5"></div>
        <div className="hidden w-2/6 h-full rounded-sm bg-black-lighter sm:block lg:w-1/4 xl:w-1/5"></div>
        <div className="hidden w-1/4 h-full rounded-sm bg-black-lighter lg:block xl:w-1/5"></div>
        <div className="hidden w-1/5 h-full rounded-sm bg-black-lighter xl:block"></div>
        <div className="hidden w-1/5 h-full rounded-sm bg-black-lighter 2xl:block"></div>
      </div>
    </div>
  );
}
