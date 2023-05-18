import { useQuery, useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { api } from '@/util/api';
import { MemberInfo } from '@/types/types';

type ApplyList = {
  data: MemberInfo[];
  exceptionMsg: null;
};

export const useProjectApply = () => {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, error, data, refetch } = useQuery<ApplyList, Error>(
    ['project', id],
    async () => {
      if (!router.route.includes('create')) {
        return await api(`/projects/${id}/applicant-list`).then(
          (res) => res.data
        );
      }
    }
  );

  /**
   * 프로젝트 지원 이벤트
   */
  const applyProject = useMutation(
    ({ position }: { position: string }) =>
      api.post(`/projects/${id}/apply`, { position }),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  /**
   * 프로젝트 지원 취소 이벤트 (최초 지원)
   */
  const applyCancel = useMutation(
    ({ position }: { position: string }) =>
      api.post(`/projects/${id}/cancel-apply`, { position }),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  /**
   * 수락된 지원자가 지원을 취소하는 이벤트
   */
  const acceptCancel = useMutation(
    ({ position }: { position: string }) =>
      api.post(`/projects/${id}/cancel-accepted-apply`, { position }),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  /**
   * 지원자를 수락하는 이벤트
   */
  const acceptApply = useMutation(
    () => api.post(`/projects/${id}/accpet/${'지원자 id를 넣어줘야함'}`),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  /**
   * 지원자를 거절하는 이벤트
   */
  const rejectApply = useMutation(
    () => api.post(`/projects/${id}/reject/${'지원자 id를 넣어줘야함'}`),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  return {
    applyQuery: { isLoading, error, data },
  };
};
