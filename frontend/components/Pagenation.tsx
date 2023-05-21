import React from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

type PagenationProps = {
  pageSize: number;
  page: number;
  onPageChange: (page: number) => void;
};

const Pagenation = ({ pageSize, page, onPageChange }: PagenationProps) => {
  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1);
  };

  return (
    <PagenationContainer page={page} pageSize={pageSize}>
      <ReactPaginate
        breakLabel="..."
        nextLabel="다음"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        forcePage={page - 1}
        marginPagesDisplayed={1}
        pageCount={pageSize}
        previousLabel="이전"
        renderOnZeroPageCount={null}
      />
    </PagenationContainer>
  );
};

export default Pagenation;

type PagenationContainerProps = {
  page: number;
  pageSize: number;
};

const PagenationContainer = styled.div<PagenationContainerProps>`
  display: flex;
  justify-content: center;
  .selected > a {
    background-color: #256ce1;
    color: white;
    :hover {
      background-color: #256ce1;
      color: white;
    }
  }
  > ul {
    display: flex;
    gap: 4px;

    .previous {
      display: ${(props) => props.page === 1 && 'none'};
    }
    .next {
      display: ${(props) => props.page === props.pageSize && 'none'};
    }
  }
  > div {
    margin: 0px 10px;
    display: flex;
    align-items: end;
    padding-bottom: 7px;
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 8px;
    height: 27px;
    font-size: 0.9rem;
    border: 1px solid #d8d9da;
    border-radius: 4px;
    margin: 0px 3px;
    cursor: pointer;
    :hover {
      background-color: #cccdce;
    }
  }
`;
