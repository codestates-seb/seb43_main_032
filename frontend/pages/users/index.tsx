import Pagenation from '@/components/Pagenation';
import UserCard from '@/components/user/UserCard';
import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import { POSITIONS } from '@/constant/constant';
import Message from '@/components/Message';
import { useAllData } from '@/hooks/react-query/useAllData';
import { usersFilter } from '@/util/filter/usersFilter';
import Head from 'next/head';
import UserItemSkeleton from '@/components/skeleton/UserItemSkeleton';

const Users = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const { userData, userLoading, userError } = useAllData();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  //filter 상태
  const [filter, setFilter] = useState(-1);

  //필터링된 데이터
  let filterData = usersFilter(userData, filter, inputValue);

  //실제 보여지는 필터 데이터
  const viewFilterData = filterData?.slice((page - 1) * 24, page * 24);

  const filterHandler = (idx: number) => {
    if (filter === idx) {
      return setFilter(-1); //다시 한 번 필터가 눌렸을 땐, 전체 카드가 조회되기위해
    }
    setFilter(idx);
    setPage(1);
  };

  if (userError) return <Message>잠시 후에 다시 시도해주세요.</Message>;
  return (
    <>
      <Head>
        <title>{`SIDE QUEST - 유저`}</title>
      </Head>
      <Wrapper>
        <SearchHeader>
          <Title>유저 목록</Title>
          <SubHeader>
            <FilterBox>
              {POSITIONS.map((btn, idx) => (
                <FilterButton
                  idx={idx}
                  filter={filter}
                  onClick={() => filterHandler(idx)}
                  key={btn}
                >
                  {btn}
                </FilterButton>
              ))}
            </FilterBox>
            <SearchBox>
              <input
                className="search-input"
                onChange={handleChange}
                value={inputValue}
                placeholder="검색어를 입력해주세요."
              />
              <SearchButton>
                <BiSearch />
              </SearchButton>
            </SearchBox>
          </SubHeader>
        </SearchHeader>
        <CardWrapper>
          {userLoading ? (
            <UserItemSkeleton count={24} />
          ) : (
            viewFilterData &&
            viewFilterData.map((user: any) => (
              <UserCard key={user.name} user={user} />
            ))
          )}
        </CardWrapper>
        <Pagenation
          pageSize={filterData ? Math.ceil(filterData.length / 24) : 0}
          page={page}
          onPageChange={setPage}
        />
      </Wrapper>
    </>
  );
};

export default Users;
const Wrapper = styled.div`
  padding: 20px;
`;
const SearchHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    margin-bottom: 0px;
  }
`;
const Title = styled.h1`
  display: flex;
  font-size: 23px;
  width: 80%;
  padding-bottom: 20px;
  font-weight: 700;
`;
const SubHeader = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 20px;
  justify-content: space-between;

  @media (max-width: 960px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const SearchBox = styled.div`
  position: relative;
  display: flex;
  width: 20%;
  align-items: center;

  .search-input {
    border: solid 2px #ececec;
    border-radius: 5px;
    width: 100%;
    padding: 10px;

    ::placeholder {
      color: #ececec;
    }

    :focus {
      outline: 9880e9;
    }
  }

  @media (max-width: 960px) {
    width: 100%;
  }
`;
const SearchButton = styled.button`
  top: 5px;
  right: 10px;
  position: absolute;
  border: none;
  font-size: 30px;
  color: skyblue;
  background-color: transparent;
`;
const FilterBox = styled.div`
  display: flex;
  height: 100%;
  width: 80%;
  gap: 8px;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: space-between;

    > button {
      width: calc(50% - 8px);
    }
  }
  @media (max-width: 960px) {
    width: 100%;
  }
`;

//필터 버튼 props
type FilterButtonProps = {
  idx: number;
  filter: number;
};

export const FilterButton = styled.button<FilterButtonProps>`
  font-family: 'Pretendard';
  background-color: ${(props) =>
    props.idx === props.filter
      ? '#6333ff'
      : 'none'}; //필터가 눌린다면 색깔 부여
  color: ${(props) => (props.idx === props.filter ? 'white' : 'none')};
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  -webkit-transition: background 0.5s ease, color 0.5s ease;
  transition: background 0.5s ease, color 0.5s ease;
  border: none;

  :hover {
    background: #9880e9;
    color: white;
  }
`;
const CardWrapper = styled.div`
  display: grid;
  min-height: 40vh;
  width: 100%;
  gap: 10px;
  margin-bottom: 30px;
  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: 960px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (min-width: 1280px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;
