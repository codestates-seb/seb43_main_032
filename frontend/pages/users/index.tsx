import Pagenation from '@/components/Pagenation';
import { TextArea } from '@/components/authAction/EditInput';
import UserCard from '@/components/user/UserCard';
import useUser from '@/hooks/react-query/useUser';
import { ChangeEvent, useState } from 'react';
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
  const [filter, setFilter] = useState(0);
  const filterHandler = (idx: number) => {
    setFilter(idx);
  };

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
