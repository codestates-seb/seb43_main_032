import { api } from '@/util/api';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ContentItem from './ContentItem';
import ContentPageNation from './ContentPageNation';

type Example = {
  id: string;
  user: string;
  score: number;
  star: number;
  view: number;
  title: string;
  tags: string[];
  content: string;
};

export default function ContentItemList() {
  const [data, setData] = useState<Example[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await api.get('/posts').then((res) => {
      setData(res.data.example[0].content);
    });
  };

  return (
    <Container>
      {data.map((ex) => (
        <ContentItem {...ex} />
      ))}
      <ContentPageNation />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  background-color: gray;
  border-radius: var(--radius-def);
  padding: var(--padding);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
