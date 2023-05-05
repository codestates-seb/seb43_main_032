import UserCard from '@/components/user/UserCard';
import useUser from '@/hooks/useUser';
import styled from 'styled-components';
//유저 페이지 입니다. 경로 '/user/'
const Wrapper = styled.div`
  display: flex;
  padding: 20px;
`;
const SearchBar = styled.div`
  padding: 20px;
`;
const CardWrapper = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  @media screen and (min-width: 640px) {
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
  const {
    userQuery: { data: users },
  } = useUser();
  return (
    <Wrapper>
      <SearchBar>
        <p className="nanum-bold">Users</p>
        <input />
      </SearchBar>
      <CardWrapper>
        {users &&
          users
            .filter((el) => el.MEMBER_ID < 30 && el.MEMBER_ID > 0)
            .map((user) => <UserCard key={user.MEMBER_ID} user={user} />)}
      </CardWrapper>
    </Wrapper>
  );
};

export default User;
