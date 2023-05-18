import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { api } from '@/util/api';
import { Answer } from '@/types/answer';
import { PageInfo } from '@/types/types';

type AnswerData = {
  data: Answer[];
  pageInfo: PageInfo;
};

export const useProjectAnswer = () => {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, error, data, refetch } = useQuery<AnswerData, Error>(
    ['project-answer-list', id],
    async () => {
      if (!router.route.includes('create')) {
        return await api(`/projects/${id}/answers`).then((res) => res.data);
      }
    }
  );

  return {
    answerQuery: { isLoading, error, data },
    answerRefetch: refetch,
  };
};
