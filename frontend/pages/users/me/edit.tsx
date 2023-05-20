import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import styled from 'styled-components';
import useUser from '@/hooks/react-query/useUser';
import EditInput from '@/components/authAction/EditInput';
import { api } from '@/util/api';
import Btn from '@/components/button/Btn';
import GridBox from '@/components/GridBox';

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
const ImgWrapper = styled.div`
  flex-shrink: 0;
  margin: 20px;
  display: flex;
  position: relative;
  flex-direction: column;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 80px;
  margin-top: 30px;
  background-color: #cbcbcb;

  input {
    border: 1px solid red;
    opacity: 0;
    width: 100%;
    height: 100%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ProfileBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  .nameBox {
    width: 100%;
  }
`;
const ButtonBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;
const Button = styled.button.attrs({ className: 'nanum-bold' })`
  padding: 20px;
  /* padding-bottom: 0px; */
  border: none;
  border-radius: 10px;
  background-color: skyblue;
`;

interface ISubmit {
  [key: string]: string;
}
export default function Edit() {
  const {
    getMyInfo: { data: user },
  } = useUser({});
  const { register, handleSubmit } = useForm();

  const onValid = (data: ISubmit) => {
    console.log(data);
    const updatedData = {
      ...data,
      techList: [''],
      profileImageUrl: '',
      yearOfDev: +data.yearOfDev,
    };
    console.log(updatedData);
    api
      .patch('/members', updatedData) //
      .then((res) => console.log(res));
  };
  const onInValid = (errors: FieldErrors) => {
    console.log(errors);
  };

  // const router = useRouter();
  // useEffect(() => {
  //   window.scrollTo({
  //     top: 670,
  //     left: 0,
  //     behavior: 'smooth',
  //   });
  // }, [router]);

  return (
    <Wrapper>
      {user && (
        <Form
          onSubmit={handleSubmit(onValid, onInValid)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <ProfileBox>
            <ImgWrapper />
            <div className="nameBox">
              <EditInput
                label="이 름"
                placeholder={user.name}
                register={register('name')}
              />
              <EditInput
                label="경 력"
                register={register('yearOfDev', {
                  pattern: {
                    value: /^[0-9]*$/,
                    message: 'Please enter only numbers',
                  },
                })}
                placeholder={`${user.yearOfDev} 년차`}
              />
            </div>
          </ProfileBox>
          <EditInput
            label="스택 목록"
            placeholder="Stack 선택 컴포넌트로 대체"
            register={register('Stack')}
          />
          <EditInput
            label="자기소개"
            placeholder={user.aboutMe}
            register={register('aboutMe')}
          />
          <EditInput
            label="분야"
            placeholder={user.position}
            register={register('position')}
          />
          <EditInput
            label="위치"
            placeholder={user.location}
            register={register('location')}
          />
          <EditInput
            label="전화번호"
            placeholder={user.phone}
            register={register('phone')}
          />

          <ButtonBox>
            <Button>Submit</Button>
          </ButtonBox>
        </Form>
      )}
    </Wrapper>
  );
}
