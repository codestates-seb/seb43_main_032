import { useQuery } from 'react-query';
import { api } from '@/util/api';
import { useRouter } from 'next/router';

type Props = {
  address: string;
  queryKey: (string | number | string[] | undefined)[];
};

export const useCommunity = <T extends {}>({ address, queryKey }: Props) => {
  const router = useRouter();
  const { isLoading, error, data, refetch } = useQuery<{
    data: T;
    total?: number;
  }>(queryKey, async () => {
    if (!router.route.includes('create')) {
      return await api(address).then((res) => res.data);
    }
  });

  return {
    communityQuery: {
      isLoading,
      error,
      data,
    },
    refetch,
  };
};
