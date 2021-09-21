import { axios } from '@services/axios.service';
import { useEffect, useState } from 'react';

const useFetchPage = (url, page) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    var isMounted = true;
    setLoading(true);
    setError('');
    axios
      .get(url + `&page=${page}`)
      .then((res) => {
        if (!isMounted) return;
        var results = res.data.results.filter(
          (item) => item.media_type !== 'person',
        );
        if (page === 1) {
          setResults(results);
        } else {
          setResults((pre) => [...pre, ...results]);
        }
        setLoading(false);
      })
      .catch((error) => {
        if (!isMounted) return;
        setError(error.message);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [page, url]);

  return { loading, error, results };
};

export default useFetchPage;
