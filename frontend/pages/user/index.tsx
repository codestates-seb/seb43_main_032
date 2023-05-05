import UserCard from '@/components/user/UserCard';
import useUser from '@/hooks/useUser';
import styled from 'styled-components';
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  gap: 10px;
`;
//유저 페이지 입니다. 경로 '/user/'
const User = () => {
  const {
    userQuery: { data: users },
  } = useUser();
  users && console.log(users[1]);
  return (
    <Wrapper>
      {users &&
        users
          .filter((el) => el.MEMBER_ID < 10 && el.MEMBER_ID > 0)
          .map((user) => <UserCard user={user} />)}
    </Wrapper>
  );
};

export default User;
