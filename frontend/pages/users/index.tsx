import Pagenation from '@/components/Pagenation';
import { TextArea } from '@/components/authAction/EditInput';
import UserCard from '@/components/user/UserCard';
import useUser from '@/hooks/react-query/useUser';
import { UserState } from '@/types/user';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';
//유저 페이지 입니다. 경로 '/user/'

const Wrapper = styled.div`
  padding: 20px;
`;
const SearchHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  @media (max-width: 768px) {
    margin-bottom: 0px;
  }
`;
const Title = styled.h1`
  display: flex;
  font-size: 60px;
  width: 80%;
  padding-bottom: 20px;
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
  display: inline-block;
  border-radius: 10px;
  background-color: gray;
  overflow: hidden;
  justify-content: flex-start;
  gap: 1px;
`;
const FilterButton = styled.button.attrs({
  className: 'nanum-bold',
})`
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  color: white;
  background-color: #5b14eb;
`;
const CardWrapper = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  margin-bottom: 50px;
  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
const User = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [keyword, setKeyword] = useState<string | undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(12);

  const {
    userQuery: { data: users, isLoading: allUserLoading },
    searchUserByKeyword: { data: searchedUsers, isLoading: searchUserLoading },
  } = useUser({ page, pageSize: size, keyword });

  const router = useRouter();
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };
  const handleClick = () => {
    if (inputValue.trim().length < 1) {
    } else {
      setKeyword(inputValue);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 670,
      left: 0,
      behavior: 'smooth',
    });
  }, [router]);

  // useEffect(() => {
  //   if (allUserLoading) return;
  //   setUsers(allUsers);
  // }, [allUsers]);
  // useEffect(() => {
  //   if (searchUserLoading) return;
  //   setUsers(searchedUsers);
  // }, [searchedUsers]);

  users && console.log(users);
  return (
    <Wrapper>
      <SearchHeader>
        <Title>Make Your Team</Title>
        <SubHeader>
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
          <FilterBox>
            {['FE', 'BE', 'UI'].map((btn) => (
              <FilterButton key={btn}>{btn} </FilterButton>
            ))}
          </FilterBox>
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

export default User;
