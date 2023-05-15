import Btn from '@/components/button/Btn';
import useAuth from '@/hooks/react-query/useAuth';
import { IUser } from '@/util/api/user';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  /* padding: 20px; */
  margin-top: 20px;
  width: 800px;
  height: 700px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;
const ImgWrapper = styled.div`
  display: flex;
  position: relative;
  width: 200px;
  height: 200px;
  /* border-radius: 50%; */
  overflow: hidden;
  margin-right: 80px;
  margin-top: 30px;
  border: 1px solid red;
  .path {
    width: 5px;
    height: 5px;
    border: 1px solid red;
  }
`;
const P = styled.div`
  display: flex;
  background-color: black;
  justify-content: center;
  color: white;
  padding: 10px;
  width: 200px;
  position: absolute;
  bottom: 0px;
`;
const Input = styled.input`
  position: relative;
  width: 100%;
  border: none;
  height: 40px;
  margin-bottom: 7px;
  border-radius: 10px;
  padding: 10px;
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
const Label = styled.p.attrs({ className: 'nanum-bold' })`
  padding-top: 20px;
  padding-bottom: 10px;
`;
interface ISubmit {
  [key: string]: string;
}
export default function edit() {
  const router = useRouter();
  useEffect(() => {
    window.scrollTo({
      top: 670,
      left: 0,
      behavior: 'smooth',
    });
  }, [router]);
  const user: IUser = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onValid = (data: ISubmit) => {
    console.log(data);
  };
  const onInValid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <Container>
      <Wrapper>
        {user && (
          <>
            <ImgWrapper>
              {/* <img alt={user.NICK_NAME} src={user.PROFILE_IMAGE} /> */}
              {/* <P>Change Image</P> */}
              <label>
                <svg
                  className="img"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={1}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input type="file" />
              </label>
            </ImgWrapper>
            <form onSubmit={handleSubmit(onValid, onInValid)}>
              {' '}
              <Label>UserName</Label>
              <Input {...register('nickName')} placeholder={user.NICK_NAME} />
              <Label>개발기간</Label>
              <Input
                {...register('yearOfDev', {
                  pattern: {
                    value: /^[0-9]*$/,
                    message: 'Please enter only numbers',
                  },
                })}
                placeholder={user.YEAR_OF_DEV + ''}
              />
              <Label>Phone</Label>
              <Input
                {...register('phoneNumber')}
                placeholder={user.PHONE_NUMBER}
              />
              <Label>Email</Label>
              <Input {...register('email')} placeholder={user.EMAIL} />
              <Label>About Me</Label>
              <Input {...register('aboutMe')} placeholder={user.ABOUT_ME} />
              <Btn>
                <span>submit</span>
              </Btn>
            </form>
          </>
        )}
      </Wrapper>
    </Container>
  );
}
