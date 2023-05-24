import styled from 'styled-components';
import UserEditForm from '@/components/authAction/UserEditForm';
import useUser from '@/hooks/react-query/user/useUser';

export default function Edit() {
  const {
    getMyInfo: { data: user },
  } = useUser({});

  return <Wrapper>{user && <UserEditForm user={user} />}</Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 80px;
  padding-top: 40px;
  padding-bottom: 0;
  margin-bottom: 20px;
`;
