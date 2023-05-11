import { useQuery } from 'react-query';
import { api } from '@/util/api';

type Props = {
  address: string;
  queryKey: (string | number | string[] | undefined)[];
};

export const useCommunity = <T extends {}>({ address, queryKey }: Props) => {
  const { isLoading, error, data, refetch } = useQuery<{
    data: T;
    total?: number;
  }>(queryKey, () => api(address).then((res) => res.data));

  return {
    isLoading,
    error,
    data,
    refetch,
  };
};
