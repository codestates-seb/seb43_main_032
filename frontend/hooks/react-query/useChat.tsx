import { loggedInUserState } from '@/recoil/atom';
import { api } from '@/util/api';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

export const useChat = () => {
  const userId = useRecoilValue(loggedInUserState);
  const { data, isLoading, error, refetch } = useQuery(
    ['chat-data', userId],
    () => api('/chat/find-all')
  );

  return {};
};
