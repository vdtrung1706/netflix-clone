import useSlider from '@hooks/useSlider';
import useViewport from '@hooks/useViewport';
import { defaultFadeInVariants } from '@utils/motion.utils';
import cx from 'classnames';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import SliderButtons from './SliderButtons';
import SliderItem from './SliderItem';
import SliderTitle from './SliderTitle';

export default function Slider({ title, selector, large }) {
  const ref = useRef();
  const { width } = useViewport();
  const { loading, error, data: movies } = useSelector(selector);
  const {
    hasPre,
    hasNext,
    itemsProps,
    distance,
    moveSection,
    paginationIndicator,
    onHover,
  } = useSlider(ref, movies, width);

  useEffect(() => {}, [width]);

  return (
    <motion.section
      variants={defaultFadeInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative w-full my-3vw group z-1"
    >
      <SliderTitle title={title} genre={123} />

      <div className="relative transition-transform duration-300 ease-in-out delay-100 select-none z-3">
        <div className="relative px-4% z-2">
          {error && <div>Error...</div>}
          {!loading && movies.length > 0 && (
            <>
              <ul className="-mt-4 px-1 mb-0 list-none absolute top-0 right-4% opacity-0 transition-all duration-300 delay-100 group-hover:opacity-100">
                {paginationIndicator()}
              </ul>

              <div className="overflow-x-scroll sm:overflow-x-visible">
                <div
                  style={{
                    transform: `translate3d(${distance}px, 0, 0)`,
                  }}
                  ref={ref}
                  className={cx(
                    'flex flex-shrink-0 duration-1000 delay-200 transform whitespace-nowrap',
                    { 'h-96 md:h-116 2xl:h-124': large },
                  )}
                >
                  {itemsProps.map((item) => {
                    return (
                      <SliderItem
                        key={item.movie.id}
                        movie={item.movie}
                        translate={item.translate}
                        transformOrigin={item.transformOrigin}
                        onHover={onHover}
                        large={large}
                      />
                    );
                  })}
                </div>
              </div>

              <SliderButtons
                hasPre={hasPre}
                hasNext={hasNext}
                moveSection={moveSection}
              />
            </>
          )}
        </div>
      </div>
    </motion.section>
  );
}
