import { useQuery, useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { api } from '@/util/api';
import { MemberInfo } from '@/types/types';
import { useRecoilValue } from 'recoil';
import { loggedInUserState } from '@/recoil/atom';

type ApplyList = {
  data: { position: string; projectId: number; memberInfo: MemberInfo }[];
  exceptionMsg: null;
};

type Props = {
  projectRefetch: () => void;
};

export const useProjectApply = ({ projectRefetch }: Props) => {
  const loggedInUser = useRecoilValue(loggedInUserState);
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, error, data, refetch } = useQuery<ApplyList, Error>(
    ['project-applicant-list', id],
    async () => {
      if (!router.route.includes('create')) {
        return await api(`/projects/${id}/applicant-list`).then(
          (res) => res.data
        );
      }
    }
  );

  //지원자 리스트 안에 있는지 체크
  const checkApply = data?.data.find(
    (data) => data.memberInfo.email === loggedInUser?.email
  );

  const applyProject = useMutation(
    ({ position }: { position: string }) =>
      api.post(`/projects/${id}/apply`, { position }),
    {
      onSuccess: () => {
        refetch();
        projectRefetch();
      },
      onError: () => {
        alert('잠시 후에 다시 시도해주세요.');
      },
    }
  );

  /**
   * 프로젝트 지원 이벤트
   */
  const applyEvent = (position: string) => {
    if (checkApply) {
      return alert('지원한 포지션을 취소해주세요.');
    }
    if (confirm('정말 지원하시겠습니까?')) applyProject.mutate({ position });
  };

  const applyCancel = useMutation(
    ({ position }: { position: string }) =>
      api.post(`/projects/${id}/cancel-apply`, { position }),
    {
      onSuccess: () => {
        refetch();
        projectRefetch();
      },
      onError: () => {
        alert('잠시 후에 다시 시도해주세요.');
      },
    }
  );

  /**
   * 프로젝트 지원 취소 이벤트 (최초 지원)
   */
  const cancelEvent = (position: string) => {
    if (confirm('정말 취소하시겠습니까?')) applyCancel.mutate({ position });
  };

  /**
   * 수락된 지원자가 지원을 취소하는 이벤트
   */
  const acceptCancel = useMutation(
    ({ position }: { position: string }) =>
      api.post(`/projects/${id}/cancel-accepted-apply`, { position }),
    {
      onSuccess: () => {
        refetch();
        projectRefetch();
      },
      onError: () => {
        alert('잠시 후에 다시 시도해주세요.');
      },
    }
  );

  const acceptApply = useMutation(
    (memberId: number) => api.post(`/projects/${id}/accpet/${memberId}`),
    {
      onSuccess: () => {
        refetch();
        projectRefetch();
      },
      onError: () => {
        alert('잠시 후에 다시 시도해주세요.');
      },
    }
  );

  /**
   * 지원자를 수락하는 이벤트
   */
  const acceptEvent = (memberId: number) => {
    acceptApply.mutate(memberId);
  };

  const rejectApply = useMutation(
    (memberId: number) => api.post(`/projects/${id}/reject/${memberId}`),
    {
      onSuccess: () => {
        refetch();
        projectRefetch();
      },
      onError: () => {
        alert('잠시 후에 다시 시도해주세요.');
      },
    }
  );

  /**
   * 지원자를 거절하는 이벤트
   */
  const rejectEvent = (memberId: number) => {
    rejectApply.mutate(memberId);
  };

  return {
    applyQuery: { isLoading, error, data },
    applyEvent,
    cancelEvent,
    acceptCancel,
    acceptEvent,
    rejectEvent,
    checkApply,
  };
};
