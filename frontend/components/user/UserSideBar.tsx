import { UserObj } from '@/types/types';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { USERS_FLTER } from '@/constant/constant';
import { BsSearch } from 'react-icons/bs';
import Btn from '../button/Btn';

export default function UserSideBar() {
  return (
    <Wrapper>
      <p className="nanum-bold">Users</p>
      <div className="search-box">
        <Input />
      </div>
      <p>직군별 검색</p>
      <p>스택별 검색</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
  /* @media screen and (max-width: 960px) {
    display: none;
  } */
`;
const Input = styled.input`
  position: relative;
  width: 100%;
  border: none;
  height: 40px;
  margin-bottom: 7px;
  margin-top: 10px;
  border-radius: 10px;
  padding: 10px;
  padding-left: 50px;
  --tw-ring-inset: var(--tw-empty, /*!*/ /*!*/);
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(59, 130, 246, 0.5);
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
    var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
    calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
    var(--tw-shadow, 0 0 #0000);
  &:focus {
    outline: none;
    --tw-ring-color: rgba(141, 184, 252, 0.3);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
      calc(5px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
      var(--tw-shadow, 0 0 #0000);
  }
`;
