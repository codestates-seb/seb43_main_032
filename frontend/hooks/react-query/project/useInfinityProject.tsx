import { useInfiniteQuery } from 'react-query';
import { useRouter } from 'next/router';
import { Project } from '@/types/project';
import { api } from '@/util/api';
import { PageProps } from '@/types/types';

export const useInfinityProject = () => {
  const router = useRouter();
  const page_limit = 4;
  const address = `/projects/findAll?size=${page_limit}`;
  const queryKey = 'projects';
  const { id } = router.query;
  const {
    isLoading,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    refetch,
  } = useInfiniteQuery(
    queryKey,
    async ({ pageParam = 1 }) => {
      if (!id) {
        return await api(`${address}&page=${pageParam}`)
          .then((res) => res.data)
          .catch(() => {});
      }
    },
    {
      getNextPageParam: (
        lastPage: PageProps<Project>,
        allPages: PageProps<Project>[]
      ) => {
        if (lastPage.data.length < page_limit) {
          return null;
        }
        return allPages.length + 1;
      },
    }
  );

  return {
    isLoading,
    error,
    data,
    infinityRefetch: refetch,
    fetchNextPage,
    hasNextPage,
    isFetching,
  };
};
