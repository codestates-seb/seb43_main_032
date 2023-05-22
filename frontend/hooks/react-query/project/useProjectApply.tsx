import { useQuery, useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { api } from '@/util/api';
import { MemberInfo } from '@/types/types';
import { useRecoilValue } from 'recoil';
import { loggedInUserState } from '@/recoil/atom';
import { Crew } from '@/types/project';
import { getCookie } from '@/util/cookie';
import { confirmAlert, errorAlert } from '@/components/alert/Alert';

type ApplyList = {
  data: { position: string; projectId: number; memberInfo: MemberInfo }[];
  exceptionMsg: null;
};

type Props = {
  projectRefetch: () => void;
  acceptedPostion: Crew | undefined;
};

export const useProjectApply = ({ projectRefetch, acceptedPostion }: Props) => {
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

  //지원
  const applyProject = useMutation(
    ({ position }: { position: string }) =>
      api.post(`/projects/${id}/apply`, { position }),
    {
      onSuccess: () => {
        refetch();
        projectRefetch();
      },
      onError: () => {
        errorAlert('잠시 후에 다시 시도해주세요.', '지원자 제출');
      },
    }
  );

  /**
   * 프로젝트 지원 이벤트
   */
  const applyEvent = (position: string) => {
    if (!getCookie('accessToken')) {
      return errorAlert('로그인이 필요합니다.', '프로젝트 지원');
    }
    if (acceptedPostion) {
      return errorAlert('이미 다른 포지션에 확정되셨습니다.', '프로젝트 지원');
    }
    if (checkApply) {
      return errorAlert('지원한 포지션을 취소해주세요.', '프로젝트 지원');
    }
    if (confirm('정말 지원하시겠습니까?')) applyProject.mutate({ position });
  };

  //취소
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
    confirmAlert('정말 취소하시겠습니까?', '프로젝트 취소가').then(() =>
      applyCancel.mutate({ position })
    );
  };

  //수락된 상태에서 취소
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

  /**
   * 수락된 지원자가 지원을 취소하는 이벤트
   */
  const acceptedCancleEvent = (target: string) => {
    confirmAlert('정말 확정을 취소하시겠습니까?', '확정 취소가').then(() =>
      acceptCancel.mutate({ position: target })
    );
  };

  //수락
  const acceptApply = useMutation(
    (memberId: number) => api.post(`/projects/${id}/accept/${memberId}`),
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

  //거절
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
    acceptedCancleEvent,
    acceptEvent,
    rejectEvent,
    checkApply,
  };
};
