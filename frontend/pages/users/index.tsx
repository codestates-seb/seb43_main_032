import Pagenation from '@/components/Pagenation';
import UserCard from '@/components/user/UserCard';
import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import { POSITIONS } from '@/constant/constant';
import useUser from '@/hooks/react-query/user/useUser';
import Message from '@/components/Message';
import { usersFilter } from '@/util/filter/usersFilter';

const Users = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(24);

  const {
    userQuery: { data: users, isLoading: allUserLoading },
  } = useUser({ userPage: page, userPageSize: size });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  //filter 상태
  const [filter, setFilter] = useState(-1);

  //필터링된 데이터
  let filterData = usersFilter(users, filter, inputValue);

  //페이지네이션 크기
  const pageSize =
    filterData && filterData?.length > 0
      ? Math.ceil(filterData?.length / 24)
      : filter === -1 && inputValue !== ''
      ? filterData?.length
      : Math.ceil(size / 24);

  //실제 보여지는 필터 데이터
  const viewFilterData = filterData?.slice((page - 1) * 24, page * 24);

  const filterHandler = (idx: number) => {
    if (filter === idx) {
      return setFilter(-1); //다시 한 번 필터가 눌렸을 땐, 전체 카드가 조회되기위해
    }
    setFilter(idx);
  };

  useEffect(() => {
    if (filter === -1 && inputValue !== '') {
      setSize(1000);
    }
  }, [inputValue]);

  if (allUserLoading) return <Message>로딩중입니다.</Message>;
  return (
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
              placeholder="Search user..."
            />
            <SearchButton>
              <BiSearch />
            </SearchButton>
          </SearchBox>
        </SubHeader>
      </SearchHeader>
      <CardWrapper>
        {viewFilterData &&
          viewFilterData.map((user: any) => (
            <UserCard key={user.name} user={user} />
          ))}
      </CardWrapper>
      <Pagenation
        pageSize={pageSize ? pageSize : 0}
        page={page}
        onPageChange={setPage}
      />
    </Wrapper>
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

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-end;
    gap: 20px;
  }
`;

const SearchBox = styled.div`
  position: relative;
  display: flex;
  width: 20%;
  align-items: center;

  .search-input {
    width: 100%;
    padding: 10px;
  }

  @media (max-width: 768px) {
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
      : '#9880e9;'}; //필터가 눌린다면 색깔 부여
  color: white;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  -webkit-transition: background 0.5s ease, color 0.5s ease;
  transition: background 0.5s ease, color 0.5s ease;
  border: none;
`;
const CardWrapper = styled.div`
  display: grid;
  min-height: 65.5vh;
  width: 100%;
  gap: 10px;
  margin-bottom: 50px;
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
