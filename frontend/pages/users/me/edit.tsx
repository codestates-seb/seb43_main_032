import styled from 'styled-components';
import UserEditForm from '@/components/authAction/UserEditForm';
import useUser from '@/hooks/react-query/user/useUser';
import Message from '@/components/Message';
import Head from 'next/head';

export default function Edit() {
  const {
    getMyInfo: { data: user, isError },
  } = useUser({});

  if (isError) return <Message>잠시 후에 다시 시도해주세요.</Message>;
  return (
    <>
      <Head>
        <title>{`Side Quest - 나의 정보 수정`}</title>
      </Head>
      <Wrapper>{user && <UserEditForm user={user} />}</Wrapper>;
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 80px;
  padding-top: 40px;
  padding-bottom: 0;
  margin-bottom: 20px;
`;
