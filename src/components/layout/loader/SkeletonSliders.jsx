export default function SkeletonSliders() {
  return (
    <div className="flex flex-col w-full h-screen gap-3 animate-pulse">
      <div className="mx-4% w-32 bg-black-light h-7"></div>
      <div className="px-4% mr-3% flex h-32 gap-1 overflow-x-visible md:h-36 xl:h-32 2xl:h-40">
        {Array(100)
          .fill(0)
          .map((_, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-1/2 h-full rounded sm:w-1/3 lg:w-1/5 xl:w-1/6 bg-black-lighter"
            ></div>
          ))}
      </div>
    </div>
  );
}
