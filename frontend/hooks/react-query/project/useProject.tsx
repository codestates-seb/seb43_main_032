import { useQuery, useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { PostData, Project } from '@/types/project';
import { api } from '@/util/api';
import { confirmAlert, errorAlert } from '@/components/alert/Alert';
import { useInfinityProject } from './useInfinityProject';
import { useTopData } from '../useTopData';

type ProjectData = {
  data: Project;
  exceptionMsg: null;
};

export const useProject = (
  heartHandler?: (isLiked: boolean) => void,
  heartCountHandler?: (totalCount: number) => void
) => {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, error, data, refetch } = useQuery<ProjectData, Error>(
    ['project', id],
    async () => {
      if (!router.route.includes('create') && id) {
        return await api(`/projects/${id}`).then((res) => res.data);
      }
    }
  );

  //글 작성, 수정, 삭제 이후 무한스크롤 데이터 refecth만 가져오기위해
  const { infinityRefetch } = useInfinityProject();
  const { topLikeProjectRefecth, topViewProjectRefecth } = useTopData();

  //좋아요
  const likeProject = useMutation(
    (cardId: number | void) =>
      api
        .post(`/likes`, {
          category: 'PROJECT',
          uniteId: cardId ? cardId : id,
        })
        .then((res) => {
          //외부의 ProjectCard만을 위한 Handler들
          if (heartHandler && heartCountHandler) {
            heartHandler(res.data.data.liked);
            heartCountHandler(res.data.data.totalLikes);
          }
        }),
    {
      onSuccess: () => {
        if (id) refetch();
      },
      onError: () => {
        errorAlert('잠시 후에 다시 시도해주세요.', '좋아요');
      },
    }
  );

  //싫어요
  const dislikeProject = useMutation(
    (cardId: number | void) =>
      api
        .post(`/likes/undo`, {
          category: 'PROJECT',
          uniteId: cardId ? cardId : id,
        })
        .then((res) => {
          //외부의 ProjectCard만을 위한 Handler들
          if (heartHandler && heartCountHandler) {
            heartHandler(res.data.data.liked);
            heartCountHandler(res.data.data.totalLikes);
          }
        }),
    {
      onSuccess: () => {
        if (id) refetch();
      },
      onError: () => {
        errorAlert('잠시 후에 다시 시도해주세요.', '싫어요');
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
        errorAlert('잠시 후에 다시 시도해주세요.', '프로젝트 업데이트');
      },
    }
  );

  //프로젝트 진행상황 관리 이벤트
  const projectEvent = (state: string) => {
    if (state === '모집 완료') {
      confirmAlert('정말 프로젝트를 시작하시겠습니까?', '프로젝트 시작을').then(
        () => updateState.mutate('진행 중')
      );
    }
    if (state === '진행 중') {
      confirmAlert('정말 프로젝트를 종료하시겠습니까?', '프로젝트 종료를').then(
        () => updateState.mutate('종료')
      );
    }
  };

  /**
   * 프로젝트 삭제 이벤트
   */
  const deleteProject = useMutation(
    () =>
      confirmAlert('정말 삭제하시겠습니까?', '프로젝트 삭제가').then(() =>
        api.delete(`/projects/${id}`).then(() => router.push('/'))
      ),
    {
      onSuccess: () => {
        router.push('/').then(() => {
          refetch();
          infinityRefetch();
          topLikeProjectRefecth();
          topViewProjectRefecth();
        });
      },
      onError: () => {
        errorAlert('잠시 후에 다시 시도해주세요.', '프로젝트 삭제');
      },
    }
  );

  /**
   * edit 페이지 이동 이벤트
   */
  const moveEdit = () => {
    router.push(`/project/${id}/edit`);
  };

  /**
   * 글 수정 이벤트
   */
  const submitEdit = useMutation(
    (data: PostData) => api.patch(`/projects/${id}`, data),
    {
      onSuccess: () => {
        router.push('/').then(() => {
          refetch();
          infinityRefetch();
          topLikeProjectRefecth();
          topViewProjectRefecth();
        });
      },
      onError: () => {
        errorAlert('잠시 후에 다시 시도해주세요.', '게시글 수정');
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
        router.push('/').then(() => {
          refetch();
          infinityRefetch();
          topLikeProjectRefecth();
          topViewProjectRefecth();
        });
      },
      onError: () => {
        errorAlert('잠시 후에 다시 시도해주세요.', '게시글 작성');
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
    projectRefetch: refetch,
  };
};
