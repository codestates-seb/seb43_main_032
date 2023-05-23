import Pagenation from '@/components/Pagenation';
import { TextArea } from '@/components/authAction/EditInput';
import UserCard from '@/components/user/UserCard';
import useUser from '@/hooks/react-query/useUser';
import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import { useQueryClient } from 'react-query';
import { POSITIONS } from '@/constant/constant';

const Users = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [keyword, setKeyword] = useState<string | undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(24);
  const queryClient = useQueryClient();

  const {
    userQuery: { data: users, isLoading: allUserLoading },
    searchUserByKeyword: { data: searchedUsers, isLoading: searchUserLoading },
  } = useUser({ page, pageSize: size, keyword });

  //페이지네이션 크기
  const pageSize = Math.ceil(size / 24);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleClick = () => {
    if (inputValue.trim().length < 1) {
    } else {
      setKeyword(inputValue);
    }
  };
  //filter 상태
  const [filter, setFilter] = useState(-1);
  const filterHandler = (idx: number) => {
    setFilter(idx);
  };

  //필터데이터
  //필터링을 constant 폴더에 POST_COMMUNITY_CATEGORY 데이터를 활용해서 구현하려고 했으나, 제출할 때 데이터가 일정하지
  //않아서 구현하지못했음. 필터가 -1일땐 전체 데이터가 보이고 0~10일땐 값에 맞는 데이터를 보여줘야하는데 유저가
  //본인의 포지션을 수정할 때, 고정된 값을 활용하도록 해야할 듯. FE/BE라는 이름으로 매칭이 되있어서 일일이 다 찾아야 함
  // constant 폴더에 POSITIONS 값만 선택해서 포지션을 제출할 수 있도록 수정부탁드려요.
  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    if (filter === -1) {
      return setFilterData([]);
    }
  }, [filter]);

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
            <SearchButton onClick={handleClick}>
              <BiSearch />
            </SearchButton>
          </SearchBox>
        </SubHeader>
      </SearchHeader>
      <CardWrapper>
        {users &&
          users.map((user: any) => <UserCard key={user.name} user={user} />)}
      </CardWrapper>
      <Pagenation pageSize={pageSize} page={page} onPageChange={setPage} />
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

const FilterButton = styled.button<FilterButtonProps>`
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
