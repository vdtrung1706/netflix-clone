import { useState, useEffect } from 'react';
import { axios } from '@services/axios.service';

const useFetch = (url) => {
  const [response, setReponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    var isMounted = true;
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        if (!isMounted) return;
        setReponse(res);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(true, err);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { response, loading, error };
};

export default useFetch;
