import { confirmAlert, errorAlert } from '@/components/alert/Alert';
import SubBtn from '@/components/button/SubBtn';
import ChatBox from '@/components/common_box/ChatBox';
import { api } from '@/util/api';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import styled from 'styled-components';
const ChatCreate = () => {
  const { register, watch } = useForm<{ content: string; title: string }>();
  const postChat = useMutation(
    () =>
      api.post(`/chat/send`, {
        ...watch(),
        receiverMemberId: window.localStorage.getItem('target'),
      }),
    {
      onSuccess: () => {
        confirmAlert('정말 쪽지를 발송하시겠습니까?', '쪽지 발송이').then(() =>
          window.close()
        );
      },
      onError: () => {
        errorAlert('잠시 후에 다시 시도해주세요.', '쪽지 발송');
      },
    }
  );

  const postEvent = () => {
    if (watch().title === '') {
      return errorAlert('제목을 입력해주세요.', '쪽지 작성');
    }
    if (watch().content === '') {
      return errorAlert('내용을 입력해주세요.', '쪽지 작성');
    }
    postChat.mutate();
  };
  const closeEvent = () => {
    window.close();
  };

  return (
    <>
      <Head>
        <title>{`SIDE QUEST - 쪽지 작성`}</title>
      </Head>
      <ChatBox type={'create'}>
        <Box>
          <div className="title-box">
            <input
              placeholder="제목을 입력해주세요."
              {...register('title')}
              type="text"
            />
          </div>
          <div className="content-box">
            <textarea
              placeholder="내용을 입력해주세요."
              {...register('content')}
              rows={15}
            ></textarea>
          </div>
          <div className="btn-box">
            <SubBtn onClick={postEvent}>발송</SubBtn>
            <SubBtn onClick={closeEvent}>취소</SubBtn>
          </div>
        </Box>
      </ChatBox>
    </>
  );
};

export default ChatCreate;

const Box = styled.div`
  height: 60vh;
  padding: var(--padding-2);
  display: flex;
  flex-direction: column;
  gap: 10px;
  .title-box {
    width: 100%;
    > input {
      width: 100%;
      padding: 6px;
    }
  }
  .content-box {
    width: 100%;
    > textarea {
      width: 100%;
      resize: none;
      padding: 6px;
    }
  }
  .btn-box {
    display: flex;
    justify-content: space-between;
    padding: 0px 100px;
  }
`;
