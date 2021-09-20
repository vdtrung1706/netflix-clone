import Layout from '@components/common/Layout';
import SliderItem from '@components/layout/content/Slider/SliderItem';
import { defaultPageFadeInVariants } from '@utils/motion.utils';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import cx from 'classnames';
import { axios } from '@services/axios.service';
import CircleLoading from '@components/layout/loader/CircleLoading';

function ExtendedPage() {
  const loader = useRef(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const location = useLocation();
  const { url, title } = location.state;

  const getMovies = useCallback(
    (page) => {
      setLoading(true);
      axios
        .get(url + `&page=${page}`)
        .then((res) => {
          setMovies((pre) => [...pre, ...res.data.results]);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(error.message);
        });
    },
    [url],
  );

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((pre) => pre + 1);
    }
  }, []);

  useEffect(() => {
    getMovies(page);
  }, [getMovies, page]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
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
        <div
          className={cx(
            'fixed top-16 left-0 right-0 z-50 h-12 font-bold bg-black md:text-sm lg:text-base xl:text-xl',
          )}
        >
          <div className="px-4% flex items-center h-full ml-2px">{title}</div>
        </div>
        <div className="flex flex-wrap pt-12 items-centers">
          {movies.length > 0 &&
            movies.map((movie, idx) => {
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
        {error && <div className="text-sm text-red">Erorr</div>}
        <div ref={loader}></div>
      </motion.div>
    </Layout>
  );
}

export default ExtendedPage;
