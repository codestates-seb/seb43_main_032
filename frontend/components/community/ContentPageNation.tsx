import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface ContentPageNationProps {
  totalData: number;
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function ContentPageNation({
  totalData,
  currentPage,
  setPage,
}: ContentPageNationProps) {
  const [pageNum, setPageNum] = useState<number[]>([]);

  useEffect(() => {
    const pageCount = Math.ceil(totalData / 10);
    const arr = [];
    for (let i = 1; i <= pageCount; i++) {
      arr.push(i);
    }
    setPageNum(arr);
  }, [totalData]);

  const getPageNumsToShow = () => {
    if (pageNum.length <= 7) {
      return pageNum;
    }

    if (currentPage < 4) {
      return [...pageNum.slice(0, 4), '...', pageNum.length];
    }

    if (currentPage > pageNum.length - 3) {
      return [1, '...', ...pageNum.slice(-4)];
    }

    return [
      1,
      '...',
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
      '...',
      pageNum.length,
    ];
  };

  return (
    <Container>
      <PageContainer>
        {getPageNumsToShow().map((el, idx) =>
          el === '...' ? (
            <PageEllipsis key={idx}>...</PageEllipsis>
          ) : (
            <PageButton
              key={idx}
              active={el === currentPage}
              onClick={() => setPage(Number(el))}
            >
              {el}
            </PageButton>
          )
        )}
      </PageContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageContainer = styled.div`
  display: flex;
`;

const PageButton = styled.button<{ active: boolean }>`
  color: ${({ active }) => (active ? '#256ce1' : 'gray')};
  font-weight: ${({ active }) => (active ? 'bold' : '')};
  margin: 0 2px;
  padding: 4px;
  border: solid 2px lightgray;
  border-radius: 4px;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    color: white;
  }
`;

const PageEllipsis = styled.span`
  margin: 0 0.5rem;
`;
