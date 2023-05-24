import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { api } from '@/util/api';

export const useMemberInfo = () => {
  const router = useRouter();
  const { id } = router.query;

  //내가 작성한 데이터들
  const { data: projectsData } = useQuery([`members-info-projects`, id], () =>
    api(`/members/info/projects`).then((res) => res.data.data)
  );
  const { data: commentsData } = useQuery([`members-info-comments`, id], () =>
    api(`/members/info/comments`).then((res) => res.data.data)
  );
  const { data: answersData } = useQuery([`members-info-answers`, id], () =>
    api(`/members/info/answers`).then((res) => res.data.data)
  );
  const { data: communitiesData } = useQuery(
    [`members-info-articles`, id],
    () => api(`/members/info/articles`).then((res) => res.data.data)
  );
  return {
    projectsData,
    commentsData,
    answersData,
    communitiesData,
  };
};
