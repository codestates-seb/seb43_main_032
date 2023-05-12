import { useState } from 'react';

interface IObj {
  isLoading: boolean;
  data: undefined | any;
  error: undefined | any;
}

export default function useApi(url: string): [(data?: any) => void, IObj] {
  // const [ state, setState] = useState({
  // 	loading: false,
  // 	data: undefined,
  // })
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<undefined | any>(undefined);
  const [error, setError] = useState<undefined | any>(undefined);
  function mutation(data?: any) {
    setIsLoading(true);
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
      .finally(() => setIsLoading(false));
  }
  return [mutation, { isLoading, data, error }];
}
