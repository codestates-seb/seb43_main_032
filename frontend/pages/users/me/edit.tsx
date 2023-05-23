import styled from 'styled-components';
import GridBox from '@/components/common_box/GridBox';
import UserEditForm from '@/components/authAction/UserEditForm';
import useUser from '@/hooks/react-query/useUser';

export default function Edit() {
  const {
    getMyInfo: { data: user },
  } = useUser({});

  return (
    <GridBox>
      <SideBar></SideBar>
      <Wrapper>
        {user && ( 
          <UserEditForm user={user} />
        )}
      </Wrapper>
    </GridBox>
  );
}

const SideBar = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  @media (max-width: 960px) {
    display: none;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-top: 0;
  padding-bottom: 0;
`;

export const dummyUser = {
  aboutMe: 'string',
  email: 'string',
  location: 'string',
  memberId: 0,
  name: 'string',
  phone: 'string',
  position: 'string',
  profileImageUrl: 'string',
  techList: [
    'java_script',
    'react',
    'next_js',
    'recoil',
    'react_query',
    'type_scriypt',
  ],
  totalStar: 0,
  yearOfDev: 0,
};
