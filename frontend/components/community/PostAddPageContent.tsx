import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import MainPost from '../MainPost';
import { DefaultObj } from '@/types/types';
import { api } from '@/util/api';

// 보류
// 에디터로 content 작성

export default function PostAddPageContent() {
  const { register, watch, reset } = useForm<DefaultObj>();

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
    api.post('/community/create', data).then();
  };

  return (
    <Container>
      <MainPost
        type={2}
        register={register}
        changeContent={changeContent}
        postProject={() => postCommunity()}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* padding: var(--padding-2); */
`;

const SubmitBtn = styled.button`
  width: 20%;
  margin: var(--padding-2);
  margin-top: 0;
  line-height: 2rem;
  border: none;
  background: #5959cb;
  color: white;
  border-radius: var(--radius-sm);

  &:hover {
    background-color: #242468;
    transform: scale(1.1);
  }
`;
