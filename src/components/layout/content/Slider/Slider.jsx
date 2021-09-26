import useSlider from '@hooks/useSlider';
import useViewport from '@hooks/useViewport';
import { defaultFadeInVariants } from '@utils/motion.utils';
import cx from 'classnames';
import { motion } from 'framer-motion';
import { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import './slider.css';
import SliderButtons from './SliderButtons';
import SliderItem from './SliderItem';
import SliderTitle from './SliderTitle';
import { selectMyList } from '@store/user-lists/selectors.user-lists';

export default function Slider({
  title,
  selector,
  large,
  isMyList = false,
  url,
  type,
  genre,
}) {
  const ref = useRef();
  const { width } = useViewport();
  const { error, data } = useSelector(selector);
  const myList = useSelector(selectMyList);

  const movies = useMemo(() => {
    if (!isMyList) return data;
    if (type === 'HOMEPAGE') return myList;
    const media_type = type === 'MOVIE_PAGE' ? 'movie' : 'tv';
    return myList.filter((movie) => movie.media_type === media_type);
  }, [data, isMyList, myList, type]);

  const { hasPre, hasNext, distance, moveSection, paginationIndicator } =
    useSlider(ref, movies, width);

  return (
    <>
      {movies.length > 0 ? (
        <motion.section
          variants={defaultFadeInVariants}
          initial="initial"
          animate="animate"
          className={cx(
            'relative w-full my-3vw z-1 hover:z-50 slider-container',
            {
              'py-2': large,
            },
          )}
        >
          <SliderTitle
            title={title}
            genre={genre}
            url={url}
            isMyList={isMyList}
          />
          <div className="relative select-none slider z-3">
            <div className="relative px-4% z-2">
              {error && <div>Error...</div>}
              <ul className="slider-page -mt-4 px-1 mb-0 list-none absolute top-0 right-4% opacity-0 transition-all duration-25">
                {paginationIndicator()}
              </ul>
              <div className="overflow-x-visible">
                <div
                  ref={ref}
                  style={{
                    transform: `translate3d(${distance}px, 0, 0)`,
                  }}
                  className={cx(
                    'flex flex-shrink-0 overflow-x-auto sm:overflow-x-visible transition-all duration-1000 delay-75 transform-gpu whitespace-nowrap',
                    { 'h-96 md:h-116 lg:h-96': large },
                  )}
                >
                  {movies.map((movie) => {
                    return (
                      <SliderItem
                        key={movie.id}
                        movie={movie}
                        large={large}
                        url={url}
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
            </div>
          </div>
        </motion.section>
      ) : null}
    </>
  );
}
