import Layout from '@components/common/Layout';
import SliderItem from '@components/layout/content/Slider/SliderItem';
import CircleLoading from '@components/layout/loader/CircleLoading';
import useFetchPage from '@hooks/useFetchPage';
import { SEARCH_ENDPOINT } from '@services/requests.service';
import { defaultPageFadeInVariants, staggerHalf } from '@utils/motion.utils';
import cx from 'classnames';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router';

export default function SearchPage() {
  const loader = useRef(null);
  const [page, setPage] = useState(1);

  const search = useLocation().search;
  const query = useMemo(
    () => new URLSearchParams(search)?.get('query').toLowerCase() || '',
    [search],
  );

  useEffect(() => {
    setPage(1);
  }, [query]);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((pre) => pre + 1);
    }
  }, []);

  const { loading, error, results } = useFetchPage(
    SEARCH_ENDPOINT + query,
    page,
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '64px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) observer.observe(loader.current);

    return () => {
      observer.disconnect();
    };
  }, [handleObserver]);

  return (
    <Layout>
      <motion.div
        variants={defaultPageFadeInVariants}
        initial="initial"
        animate="animate"
        className="mt-36 px-4%"
      >
        {results.length > 0 ? (
          <>
            <div className="flex flex-wrap items-center gap-2 mx-4 text-sm font-light font-roboto">
              <span className="font-normal text-grey-txt">
                Explore titles related to:
              </span>
              <span className="font-normal">...</span>
              <span className="font-normal">...</span>
            </div>
            <motion.div
              variants={staggerHalf}
              initial="initial"
              animate="animate"
              className="flex flex-wrap items-centers"
            >
              {results.map((movie, idx) => {
                return (
                  <SliderItem key={idx} movie={movie} inSearchPage={true} />
                );
              })}
            </motion.div>
          </>
        ) : (
          <div>
            Sorry, we did not find any movie or tv-show with that title.
          </div>
        )}
        {loading && <CircleLoading className={cx('w-10 h-10 pt-12 mx-auto')} />}
        {error && <div className="text-sm text-red">{error}</div>}
        <div ref={loader}></div>
      </motion.div>
    </Layout>
  );
}
