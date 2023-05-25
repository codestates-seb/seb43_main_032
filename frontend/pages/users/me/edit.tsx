import styled from 'styled-components';
import UserEditForm from '@/components/authAction/UserEditForm';
import useUser from '@/hooks/react-query/user/useUser';
import { useRouter } from 'next/router';

export default function Edit() {
  const router = useRouter();
  const {
    getMyInfo: { data: user, isError },
  } = useUser({});

  if (isError) return router.push('/404');
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
