import Message from '@/components/Message';
import Pagenation from '@/components/Pagenation';
import ChatBox from '@/components/common_box/ChatBox';
import { useGetChat } from '@/hooks/react-query/chat/useChat';
import { chatState } from '@/recoil/atom';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import styled from 'styled-components';
const Chat = () => {
  const route = useRouter();
  const [chat, setChat] = useRecoilState(chatState);
  const size = 10;
  const [page, setPage] = useState(1);
  const { data, isLoading, error, refetch, deleteChat } = useGetChat({
    page,
    size,
  });
  const chatData = data?.data;
  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    if (chatData) setChat(chatData);
  }, [chatData]);

  const deleteEvent = (chatId: number) => {
    deleteChat.mutate(chatId);
  };
  const moveItem = (chatId: number) => {
    route.push(`/chat/${chatId}`);
  };

  if (error) return <Message>잠시 후에 다시 시도해주세요.</Message>;
  if (isLoading) return <Message>로딩중입니다.</Message>;
  return (
    <ChatBox>
      <Box>
        {chatData && chatData.length === 0 ? (
          <Message>쪽지가 없어요</Message>
        ) : (
          chatData &&
          chatData.map((chat) => (
            <li className="chat-item">
              <div className="chat-title" onClick={() => moveItem(chat.id)}>
                {chat.title}
              </div>
              <div className="user">{chat.name}</div>
              <div className="delete-box" onClick={() => deleteEvent(chat.id)}>
                X
              </div>
            </li>
          ))
        )}
      </Box>
      <PageBox>
        <Pagenation
          pageSize={data?.pageInfo.totalPages ? data?.pageInfo.totalPages : 0}
          page={page}
          onPageChange={setPage}
        />
      </PageBox>
    </ChatBox>
  );
};

export default Chat;

const Box = styled.div`
  height: 60vh;
  padding: var(--padding-2);
  display: flex;
  flex-direction: column;
  gap: 10px;

  .chat-item {
    display: flex;
    align-items: center;
    > div {
      border: 1px solid black;
    }
    .chat-title {
      padding: 4px;
      flex: 1;
      cursor: pointer;
    }
    .user {
      padding: 4px;
      flex: 0.3;
    }
    .delete-box {
      padding: 4px;
      cursor: pointer;
    }
  }
`;

const PageBox = styled.div`
  padding: var(--padding-2);
`;
