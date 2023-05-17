import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MainPost from '../MainPost';
import { Form } from '@/types/types';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { api } from '@/util/api';
import { useCommunity } from '@/hooks/react-query/useCommunity';
import { Community } from '@/types/community';
import Message from '../Message';
import { UserState } from '@/types/user';
import { getUserData } from '@/util/api/user';

export default function CommunityForm() {
  const router = useRouter();
  const id = router.query.id;
  const address = `/community/post/${id}`;
  const queryKey = ['community', 'post', id];
  const { communityQuery } = useCommunity<Community>({
    address,
    queryKey,
  });
  const data = communityQuery.data?.data;

  const { register, watch } = useForm<Form>();
  const [editor, setEditor] = useState('');
  const changeContent = (value: string) => {
    setEditor(value);
  };

  //작성자 데이터
  const [writerState, setWriterState] = useState<UserState>();
  useEffect(() => {
    if (data) getUserData(data.id).then((res) => setWriterState(res));
  }, [communityQuery.isLoading]);

  const postCommunity = () => {
    const data = {
      title: watch().title,
      position: watch().position,
      editor,
    };
    api
      .post('/community/create', data)
      .then(() => router.push('/community'))
      .catch(() => alert('잠시 후에 다시 시도해주세요.'));
  };

  if (communityQuery.isLoading) return <Message>로딩중입니다.</Message>;
  if (communityQuery.error)
    return <Message>잠시 후 다시 시도해주세요.</Message>;

  return (
    <Container>
      <MainPost
        type={2}
        register={register}
        changeContent={changeContent}
        postProject={() => postCommunity()}
        data={
          data && {
            title: data.title,
            content: data.content,
            position: '백엔드',
          }
        }
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: var(--padding-2);
`;
