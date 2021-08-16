import axios from '../services/axios';
import { useState, useEffect } from 'react';

export default function useFetch(url) {
  const [response, setReponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then(res => {
        const results = res.data.results;
        setReponse(results);
        setLoading(false);
      })
      .catch(err => {
        setError(true, err);
        setLoading(false);
      });
  }, [url]);

  return [response, loading, error];
}
