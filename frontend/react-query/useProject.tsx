import { useQuery, useMutation, QueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { PostState, Project } from '@/types/types';
import { api } from '@/util/api';

type ProjectData = {
  post_data: Project;
  post_state: PostState;
};

export const useProject = () => {
  const router = useRouter();
  const queryClient = new QueryClient();

  const { isLoading, error, data, refetch } = useQuery<ProjectData, Error>(
    ['project', router.query.id],
    () => api(router.asPath).then((res) => res.data)
  );

  //직군 지원
  const wantJob = useMutation(
    (job: string) => api.post(`${router.asPath}/want`, { data: job }),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['project', router.query.id], data);
        refetch();
      },
    }
  );

  //지원한 직군 취소
  const cancleJob = useMutation(
    (job: string) => api.post(`${router.asPath}/cancle`, { data: job }),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['project', router.query.id], data);
        refetch();
      },
    }
  );

  return { isLoading, error, data, wantJob, cancleJob };
};
