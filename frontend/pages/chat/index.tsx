import Message from '@/components/Message';
import Pagenation from '@/components/Pagenation';
import ChatBox from '@/components/common_box/ChatBox';
import { useGetChat } from '@/hooks/react-query/chat/useChat';
import { chatState } from '@/recoil/atom';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import styled from 'styled-components';
const Chat = () => {
  const router = useRouter();
  const [, setChat] = useRecoilState(chatState);
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
    router.push(`/chat/${chatId}`);
  };

  if (error) return <Message>잠시 후에 다시 시도해주세요.</Message>;
  if (isLoading) return <Message>로딩중입니다.</Message>;
  return (
    <>
      <Head>
        <title>{`SIDE QUEST - 쪽지함`}</title>
      </Head>
      <ChatBox>
        <Box>
          {chatData && chatData.length === 0 ? (
            <Message className="msg">쪽지가 없어요.</Message>
          ) : (
            chatData &&
            chatData.map((chat) => (
              <li className="chat-item" onClick={() => moveItem(chat.id)}>
                <div className="chat-title">{chat.title}</div>
                <div className="user">{chat.name}</div>
                <div
                  className="delete-box"
                  onClick={() => deleteEvent(chat.id)}
                >
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
    </>
  );
};

export default Chat;

const Box = styled.div`
  padding: var(--padding-2);
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 15px;

  .msg {
    font-size: 18px;
  }

  .chat-item {
    border-bottom: solid 1px #ececec;
    padding: 8px;
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;

    .chat-title {
      width: 274px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 4px;
      flex: 1;
      cursor: pointer;
      font-weight: 500;
    }

    .user {
      min-width: 100px;
      padding: 4px;
      flex: 0.3;
      color: #717171;
      font-size: 12px;
    }

    .delete-box {
      padding: 4px;
      cursor: pointer;
      background: #b87fe7;
      color: white;
      border-radius: 5px;
    }
  }
`;

const PageBox = styled.div`
  padding: var(--padding-2);
  div {
    margin: 0;
  }
`;
