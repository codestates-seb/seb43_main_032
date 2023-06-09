import styled from 'styled-components';
import AuthInput from './AuthInput';
import { useForm, FieldErrors } from 'react-hook-form';
import usePostApi from '../../hooks/react-query/user/useLogin';
import { errorToast } from '../alert/Alert';

interface ISignUpForm {
  name: string;
  email: string;
  password: string;
  verifyPw: string;
}
export default function SignUpForm() {
  const [, signUp] = usePostApi('members/signup');
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpForm>();

  const onValid = (data: ISignUpForm) => {
    signUp(data);
  };

  const onInValid = (errors: FieldErrors) => {
    if (Object.keys(errors).length >= 1) {
      return errorToast('모든 정보를 올바르게 입력해 주세요.');
    }

    if (errors.email) {
      return errorToast('이메일을 입력해 주세요.');
    }

    if (errors.password) {
      return errorToast('비밀번호를 입력해 주세요.');
    }

    if (errors.name) {
      return errorToast('아이디를 입력해 주세요.');
    }

    if (errors.verifyPw) {
      return errorToast('8자 이상의 비밀번호를 확인해 주세요.');
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onValid, onInValid)}>
        <AuthInput //
          register={register('name', {
            required: '닉네임을 입력해주세요',
          })}
          name="User ID"
          placeholder="Enter your ID"
        />
        <AuthInput //
          register={register('email', {
            required: 'Email을 입력해주세요',
          })}
          name="Email Address"
          type="email"
          placeholder="Enter your email Address"
        />
        <AuthInput
          register={register('password', {
            required: '비밀번호를 입력해 주세요',
            minLength: {
              message: '비밀번호는 8자 이상이어야 합니다.',
              value: 8,
            },
          })}
          name="Password"
          type="password"
          placeholder="Enter your password"
        />
        <AuthInput
          register={register('verifyPw', {
            required: '비밀번호를 입력해 주세요',
            validate: (value) =>
              value === watch('password') || '비밀번호가 일치하지 않습니다.',
          })}
          type="password"
          placeholder="Re-enter your password"
        />
        <Submit type="submit" value={'Sign Up'} />
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Form = styled.form`
  width: 100%;

  :nth-child(4) {
    margin-top: -10px;
  }
`;

const Submit = styled.input`
  width: 100%;
  border: none;
  margin-bottom: 20px;
  border-radius: 10px;
  line-height: 42px;
  box-shadow: 2px 2px 5px #767676;
  padding: 0;
  border: none;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  font-size: 15px;
  color: #616161;
  text-shadow: #e0e0e0 1px 1px 0;
  font-weight: 700;
  font-family: 'Pretendard';
  transition: all 1s;

  &:hover {
    box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 10px #ffffff73;
    color: #8217f3;
  }
`;