import { api } from '@/util/api';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ContentItem from './ContentItem';
import ContentPageNation from './ContentPageNation';
import { useRecoilState, useRecoilValue } from 'recoil';
import { resetSearchState, searchState } from '@/recoil/atom';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

export type Example = {
  ARTICLE_ID: number;
  MEMBER_ID: string;
  USERSTAR: number;
  AVATAR: string;
  CATEGORY: string;
  TITLE: string;
  CONTENT: null;
  CREATED_AY: Date;
  STAR: number;
  VIEW: number;
  TAGS: string[];
  STATUS: null;
  COMMENT: [];
};

const getData = async () => {
  const res = await api.get('/post');
  return res.data;
};

export default function ContentItemList() {
  // 검색어 입력 시 atom 저장, 불러오기
  const searchTitle = useRecoilValue(searchState);

  // 초기화 상태값
  const [resetSearch, setResetSearch] = useRecoilState(resetSearchState);

  // 데이터 불러오기
  const { data, isLoading, isError } = useQuery('posts', getData);
  if (isLoading) return <div>isLoading...</div>;
  if (isError) return <div>isError...</div>;

  // 주솟값으로 데이터 필터링
  const router = useRouter();
  const currentRouter = router.query.id;

  let filteredData = data;

  // 카테고리별로 데이터 필터링
  if (currentRouter && currentRouter !== 'all') {
    filteredData = data.filter(
      (post: Example) => post.CATEGORY === currentRouter
    );
  }

  // 입력된 검색어별 데이터 필터링
  if (searchTitle !== '') {
    filteredData = filteredData.filter((post: Example) =>
      post.TITLE.toLowerCase().includes(searchTitle.toLowerCase())
    );
  }

  if (!resetSearch) {
    filteredData = data;
  }

  return (
    <Container>
      {filteredData &&
        filteredData.map((ex: Example, idx: number) => (
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
