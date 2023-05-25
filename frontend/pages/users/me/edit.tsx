import styled from 'styled-components';
import UserEditForm from '@/components/authAction/UserEditForm';
import useUser from '@/hooks/react-query/user/useUser';
import Custom404 from '@/components/Custom404';

export default function Edit() {
  const {
    getMyInfo: { data: user, isError },
  } = useUser({});

  if (isError) return <Custom404 />;
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
