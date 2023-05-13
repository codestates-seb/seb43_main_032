import React, { useState } from 'react';
import styled from 'styled-components';
import MainPost from '../MainPost';
import { DefaultObj } from '@/types/types';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { api } from '@/util/api';

export default function CommunityForm() {
  const router = useRouter();
  const { register, watch } = useForm<DefaultObj>();

  const [editor, setEditor] = useState('');
  const changeContent = (value: string) => {
    setEditor(value);
  };

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
  return (
    <Container>
      <AddPost>
        <MainPost
          type={2}
          register={register}
          changeContent={changeContent}
          postProject={() => postCommunity()}
        />
      </AddPost>
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

const AddPost = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
