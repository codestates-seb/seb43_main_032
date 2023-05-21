import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import styled from 'styled-components';
import EditInput from '@/components/authAction/EditInput';
import { api } from '@/util/api';
import GridBox from '@/components/GridBox';
import { Tech } from '@/types/project';
import SelectStack from '@/components/stack/SelectStack';
import { mergeData, updateData } from '@/util/user';
import UserEditForm from '@/components/authAction/UserEditForm';

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
  techList: ['string'],
  totalStar: 0,
  yearOfDev: 0,
};
export default function Edit() {
  const user = dummyUser;
  // const {
  //   getMyInfo: { data: user },
  // } = useUser({});

  // const router = useRouter();
  // useEffect(() => {
  //   window.scrollTo({
  //     top: 670,
  //     left: 0,
  //     behavior: 'smooth',
  //   });
  // }, [router]);

  return (
    <GridBox>
      <SideBar></SideBar>
      <Wrapper>
        {user && ( //
          <UserEditForm user={user} />
        )}
      </Wrapper>
    </GridBox>
  );
}
