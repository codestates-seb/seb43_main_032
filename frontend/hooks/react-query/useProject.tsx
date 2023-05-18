import { useQuery, useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { Project } from '@/types/project';
import { api } from '@/util/api';

type ProjectData = {
  data: Project;
  exceptionMsg: null;
};

type PostData = {
  startDate: string;
  endDate: string | null | undefined;
  writerPosition: string;
  title: string;
  thumbnailImageUrl: string;
  content: string;
  techList: {
    techList: string[];
  };
  fieldList: {
    fieldList: string[];
  };
  positionCrewList: {
    positionList: string[];
    positionNumberList: number[];
  };
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

  //하트관련 (아직 서버 미 구현)
  // const updateHeart = useMutation(() => api.post(`/projects/heart`), {
  //   onSuccess: () => {
  //     refetch();
  //   },
  // });

  /**
   * 프로젝트 게시글 상태 업데이트 이벤트
   */
  const updateState = useMutation(
    (status: string) => api.post(`/projects/${id}/status`, { status }),
    {
      onSuccess: () => {
        refetch();
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
  const deleteProject = () => {
    if (confirm('정말 삭제하시겠습니까?'))
      api.delete(`/projects/${id}`).then(() => router.push('/'));
  };

  /**
   * edit 페이지 이동 이벤트
   */
  const moveEdit = () => {
    if (confirm('정말 수정하시겠습니까?')) router.push(`/project/edit`);
  };

  /**
   * 글 수정 이벤트
   */
  const submitEdit = (data: PostData) => {
    api
      .patch(`/projects/${id}`, data)
      .then(() => router.push('/'))
      .catch(() => alert('잠시 후에 다시 시도해주세요.'));
  };

  /**
   * 글 작성 이벤트
   */
  const submitPost = (data: PostData) => {
    api
      .post('/projects', data)
      .then(() => router.push('/'))
      .catch(() => alert('잠시 후에 다시 시도해주세요.'));
  };

  return {
    projectQuery: { isLoading, error, data },
    // updateHeart,
    updateState,
    projectEvent,
    deleteProject,
    moveEdit,
    submitEdit,
    submitPost,
  };
};
