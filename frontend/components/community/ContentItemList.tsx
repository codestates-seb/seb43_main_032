import { api } from '@/util/api';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ContentItem from './ContentItem';
import ContentPageNation from './ContentPageNation';
import { useRecoilState, useRecoilValue } from 'recoil';
import { resetSearchState, searchState } from '@/recoil/atom';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { Article } from '@/types/types';

const getData = async (): Promise<Article[]> => {
  // back 부분에서 데이터를 필터링으로 넘겨준다.
  // params만 상태로 관리 star, view 등 등

  const res = await api('/post');
  const sortedData = res.data.sort((a: Article, b: Article) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });
  return sortedData;
};

export default function ContentItemList() {
  // 주솟값으로 데이터 필터링
  const router = useRouter();
  const currentRouter = router.query.id;

  // 검색어 입력 시 atom 저장, 불러오기
  const searchTitle = useRecoilValue(searchState);

  // 초기화 상태값
  const [resetSearch, setResetSearch] = useRecoilState(resetSearchState);

  // 데이터 불러오기
  const { data = [], isLoading, isError } = useQuery(['posts'], getData);
  if (isLoading) return <div>isLoading...</div>;
  if (isError) return <div>isError...</div>;
  // querykey [post, filter] 등

  let filteredData = data!;

  // 카테고리별로 데이터 필터링
  if (currentRouter && currentRouter !== 'all') {
    filteredData = data.filter(
      (post: Article) => post.category === currentRouter
    );
  }

  // 입력된 검색어별 데이터 필터링
  if (searchTitle !== '') {
    filteredData = filteredData.filter((post: Article) =>
      post.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
  }

  if (!resetSearch) {
    filteredData = data!;
  }

  return (
    <Container>
      {filteredData &&
        filteredData.map((ex: Article, idx: number) => (
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
