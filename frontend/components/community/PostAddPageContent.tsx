import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import MainPost from '../MainPost';
import { DefaultObj } from '@/types/types';

// 보류
// 에디터로 content 작성
const postCommunity = () => {
  // const data = {
  //   start,
  //   end,
  //   select,
  //   tags,
  //   job,
  //   position: watch().position,
  //   title: watch().title,
  //   editor,
  // };
  //   api.post('/project', data).then(() => router.push('/'));
};

export default function PostAddPageContent() {
  const { register, watch, reset } = useForm<DefaultObj>();

  const [editor, setEditor] = useState('');
  const changeContent = (value: string) => {
    setEditor(value);
  };

  const submitFun = () => {
    postCommunity();
  };

  // post Project 수정 필

  return (
    <Container>
      <MainPost
        type={2}
        register={register}
        changeContent={changeContent}
        postProject={submitFun}
      />
      <SubmitBtn onSubmit={submitFun}>제출하기</SubmitBtn>
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
