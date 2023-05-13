import useApi from '@/hooks/useApi';
import { useEffect } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import styled from 'styled-components';

const Wrapper = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 20px;
  margin-top: 20px;
  width: 300px;
`;
const ImgWrapper = styled.div`
  display: flex;
  position: relative;
  width: 150px;
  height: 150px;
  justify-content: center;
  /* align-items: center; */
  border-radius: 50%;
  overflow: hidden;
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
  const [getUser, { data: user, isLoading }] = useApi('/api/user/me');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    getUser();
  }, []);
  const onValid = (data: ISubmit) => {
    console.log(data);
  };
  const onInValid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <Wrapper>
      {user && (
        <>
          <ImgWrapper>
            <img alt={user.name} src={user.profileImageUrl} />
            <P>Change Image</P>
          </ImgWrapper>
          <form onSubmit={handleSubmit(onValid, onInValid)}>
            {' '}
            <Label>UserName</Label>
            <Input {...register('name')} placeholder={user.name} />
            <Label>개발기간</Label>
            <Input
              {...register('yearOfDev', {
                pattern: {
                  value: /^[0-9]*$/,
                  message: 'Please enter only numbers',
                },
              })}
              placeholder={user.yearOfDev + ''}
            />
            <Label>Phone</Label>
            <Input {...register('phoneNumber')} placeholder={user.phone} />
            <Label>Email</Label>
            <Input {...register('email')} placeholder={user.email} />
            <Label>About Me</Label>
            <Input {...register('aboutMe')} placeholder={user.aboutMe} />
            <button>submit</button>
          </form>
        </>
      )}
    </Wrapper>
  );
}
