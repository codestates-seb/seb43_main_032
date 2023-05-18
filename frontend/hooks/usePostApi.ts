import { useState } from 'react';
import { api } from '@/util/api';

interface IObj {
  isLoading: boolean;
  data: undefined | any;
  error: undefined | any;
}

export default function usePostApi(url: string): [(data?: any) => void, IObj] {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<undefined | any>(undefined);
  const [error, setError] = useState<undefined | any>(undefined);
  function mutation(data?: any) {
    setIsLoading(true);
    api
      .post(url, data)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return [mutation, { isLoading, data, error }];
}
