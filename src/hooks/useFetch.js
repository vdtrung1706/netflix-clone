import { useState, useEffect } from 'react';
import { axios } from '@services/axios.service';

const useFetch = (url) => {
  const [response, setReponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setReponse(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(true, err);
        setLoading(false);
      });
  }, [url]);

  return { response, loading, error };
};

export default useFetch;
