import Layout from '@components/common/Layout';
import SliderItem from '@components/layout/content/Slider/SliderItem';
import CircleLoading from '@components/layout/loader/CircleLoading';
import useFetchPage from '@hooks/useFetchPage';
import { defaultPageFadeInVariants } from '@utils/motion.utils';
import cx from 'classnames';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';

function ExtendedPage() {
  const loader = useRef(null);
  const [page, setPage] = useState(1);
  const location = useLocation();
  const { url, title } = location.state;

  const { loading, error, results } = useFetchPage(url, page);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((pre) => pre + 1);
    }
  }, []);

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
        className="px-4% relative pt-16"
      >
        <div className="fixed left-0 right-0 z-50 h-12 font-bold bg-black top-14 md:text-sm lg:text-base xl:text-xl">
          <div className="relative mx-auto max-w-screen-2xl">
            <div className="px-4% flex items-center h-full ml-2px">{title}</div>
          </div>
        </div>

        <div className="flex flex-wrap pt-12 items-centers">
          {results &&
            results.map((movie, idx) => {
              return (
                <SliderItem
                  key={idx}
                  movie={movie}
                  inSearchPage={true}
                  url={url}
                />
              );
            })}
        </div>

        {loading && <CircleLoading className={cx('w-10 h-10 pt-12 mx-auto')} />}
        {error && <div className="text-sm text-red">{error}</div>}
        <div ref={loader}></div>
      </motion.div>
    </Layout>
  );
}

export default ExtendedPage;
