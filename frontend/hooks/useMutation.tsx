import { useState } from 'react';

interface IObj {
  loading: boolean;
  data: undefined | any;
  error: undefined | any;
}

export default function useMutation(url: string): [(data?: any) => void, IObj] {
  // const [ state, setState] = useState({
  // 	loading: false,
  // 	data: undefined,
  // })
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<undefined | any>(undefined);
  const [error, setError] = useState<undefined | any>(undefined);
  function mutation(data?: any) {
    setLoading(true);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }) //
      .then((res) => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }
  return [mutation, { loading, data, error }];
}
