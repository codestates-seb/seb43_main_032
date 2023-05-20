import { useQuery, useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { PostData, Project } from '@/types/project';
import { api } from '@/util/api';

type ProjectData = {
  data: Project;
  exceptionMsg: null;
};

export const useProject = () => {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, error, data, refetch } = useQuery<ProjectData, Error>(
    ['project', id],
    async () => {
      if (!router.route.includes('create')) {
        return await api(`/projects/${id}`).then((res) => res.data);
      }
    }
  );

  //좋아요
  const likeProject = useMutation(
    () => api.post(`/likes`, { category: 'PROJECT', uniteId: id }),
    {
      onSuccess: () => {
        refetch();
      },
      onError: () => {
        alert('잠시 후에 다시 시도해주세요.');
      },
    }
  );

  //싫어요
  const dislikeProject = useMutation(
    () => api.post(`/likes/undo`, { category: 'PROJECT', uniteId: id }),
    {
      onSuccess: () => {
        refetch();
      },
      onError: () => {
        alert('잠시 후에 다시 시도해주세요.');
      },
    }
  );

  /**
   * 프로젝트 게시글 상태 업데이트 이벤트
   */
  const updateState = useMutation(
    (status: string) => api.post(`/projects/${id}/status`, { status }),
    {
      onSuccess: () => {
        refetch();
      },
      onError: () => {
        alert('잠시 후에 다시 시도해주세요.');
      },
    }
  );

  //프로젝트 진행상황 관리 이벤트
  const projectEvent = (state: string) => {
    if (state === '모집 완료' && confirm('정말 프로젝트를 시작하시겠습니까?')) {
      updateState.mutate('진행 중');
    }
    if (state === '진행 중' && confirm('정말 프로젝트를 종료하시겠습니까?')) {
      updateState.mutate('종료');
    }
  };

  /**
   * 프로젝트 삭제 이벤트
   */
  const deleteProject = useMutation(
    async () => {
      if (confirm('정말 삭제하시겠습니까?'))
        return await api.delete(`/projects/${id}`).then(() => router.push('/'));
    },
    {
      onSuccess: () => {
        router.push('/').then(() => refetch());
      },
      onError: () => {
        alert('잠시 후에 다시 시도해주세요.');
      },
    }
  );

  /**
   * edit 페이지 이동 이벤트
   */
  const moveEdit = () => {
    if (confirm('정말 수정하시겠습니까?')) router.push(`/project/${id}/edit`);
  };

  /**
   * 글 수정 이벤트
   */
  const submitEdit = useMutation(
    (data: PostData) => api.patch(`/projects/${id}`, data),
    {
      onSuccess: () => {
        router.push('/').then(() => refetch());
      },
      onError: () => {
        alert('잠시 후에 다시 시도해주세요.');
      },
    }
  );

  /**
   * 글 작성 이벤트
   */
  const submitPost = useMutation(
    (data: PostData) => api.post('/projects', data),
    {
      onSuccess: () => {
        router.push('/').then(() => refetch());
      },
      onError: () => {
        alert('잠시 후에 다시 시도해주세요.');
      },
    }
  );

  return {
    projectQuery: { isLoading, error, data },
    updateState,
    likeProject,
    dislikeProject,
    projectEvent,
    deleteProject,
    moveEdit,
    submitEdit,
    submitPost,
  };
};
