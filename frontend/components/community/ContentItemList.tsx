import { api } from '@/util/api';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ContentItem from './ContentItem';
import ContentPageNation from './ContentPageNation';
import { useRecoilState } from 'recoil';
import { searchState } from '@/recoil/atom';

type Example = {
  id: number;
  userEmail: string;
  userStar: number;
  avatar: string;
  category: string;
  title: string;
  content: string;
  createdAt: Date;
  modifiedAt: Date;
  star: number;
  viewCount: number;
  tags: string[];
};

export default function ContentItemList() {
  const [data, setData] = useState<Example[]>([]);
  const [searchTitle, setSearchTitle] = useRecoilState(searchState);

  useEffect(() => {
    const getData = async () => {
      if (searchTitle !== '') {
        await api.get('/post').then((res) => {
          const filtered = res.data.filter((el: Example) =>
            el.title.toLowerCase().includes(searchTitle.toLowerCase())
          );
          setData(filtered);
        });
      } else {
        await api.get('/post').then((res) => {
          setData(res.data);
        });
      }
    };
    getData();
  }, [searchTitle]);

  return (
    <Container>
      {data.map((ex, idx) => (
        <ContentItem {...ex} key={idx} />
      ))}
      <ContentPageNation />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  background-color: gray;
  border-radius: var(--radius-def);
  padding: var(--padding-2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
