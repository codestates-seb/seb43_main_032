import { errorAlert } from '@/components/alert/Alert';
import { loggedInUserState } from '@/recoil/atom';
import { PageInfo } from '@/types/types';
import { Chat } from '@/types/user';
import { api } from '@/util/api';
import { useMutation, useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
type Props = {
  page: number;
  size: number;
};

export const useGetChat = ({ page, size }: Props) => {
  const userId = useRecoilValue(loggedInUserState);
  const { isLoading, error, data, refetch } = useQuery<
    {
      data: Chat[];
      pageInfo: PageInfo;
    },
    Error
  >(['chat-data', userId], () =>
    api(`/chat/find-all?page=${page}&size=${size}`).then((res) => res.data)
  );

  /**
   * 쪽지를 삭제하는 이벤트
   */
  const deleteChat = useMutation(
    (chatId: number) => api.delete(`/chat/${chatId}`),
    {
      onSuccess: () => {
        refetch();
      },
      onError: () => {
        errorAlert('잠시 후에 다시 시도해주세요.', '쪽지 삭제');
      },
    }
  );

  return {
    data,
    isLoading,
    error,
    refetch,
    deleteChat,
  };
};
