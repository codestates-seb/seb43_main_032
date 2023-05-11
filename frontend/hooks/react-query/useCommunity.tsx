import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { api } from '@/util/api';
import { Community } from '@/types/community';

type Props = {
  address: string;
  page: number;
};

export const useCommunity = ({ address, page }: Props) => {
  const router = useRouter();
  const { category } = router.query;

  const queryKey = category
    ? ['community', page, category]
    : ['community', page];

  const { isLoading, error, data, refetch } = useQuery<{
    data: Community[];
    total: number;
  }>(queryKey, () => api(address).then((res) => res.data));

  return {
    isLoading,
    error,
    data,
    refetch,
  };
};
