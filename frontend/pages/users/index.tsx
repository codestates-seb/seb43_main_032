import Pagenation from '@/components/Pagenation';
import { TextArea } from '@/components/authAction/EditInput';
import UserCard from '@/components/user/UserCard';
import useUser from '@/hooks/react-query/useUser';
import { User, UserState } from '@/types/user';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import { useQueryClient } from 'react-query';

const Users = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [keyword, setKeyword] = useState<string | undefined>(undefined);
  const [page, setPage] = useState<number>(2);
  const [size, setSize] = useState<number>(8);
  const queryClient = useQueryClient();

  const {
    userQuery: { data: users, isLoading: allUserLoading },
    searchUserByKeyword: { data: searchedUsers, isLoading: searchUserLoading },
  } = useUser({ page, pageSize: size, keyword });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };
  const handleClick = () => {
    if (inputValue.trim().length < 1) {
    } else {
      setKeyword(inputValue);
    }
  };

  return (
    <Wrapper>
      <SearchHeader>
        <Title>유저 목록</Title>
        <SubHeader>
          <FilterBox>
            {['프론트엔드', '백엔드', 'UX/UI'].map((btn) => (
              <FilterButton key={btn}>{btn} </FilterButton>
            ))}
          </FilterBox>
          <SearchBox>
            <TextArea
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
          users.map((user: UserState) => (
            <UserCard key={user.name} user={user} />
          ))}
      </CardWrapper>
      <Pagenation pageSize={size} page={page} onPageChange={setPage} />
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
  width: 50%;
  align-items: flex-start;

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
  gap: 8px;
`;
const FilterButton = styled.button`
  font-family: 'Pretendard';
  background-color: #6333ff;
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
