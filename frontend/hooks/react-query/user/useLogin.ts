import { useRouter } from 'next/router';
import { api } from '@/util/api';
import { setCookie } from '@/util/cookie';
import { LoginData } from '@/types/user';
import { errorAlert, successToast } from '@/components/alert/Alert';

export default function usePostApi(endpoint: string) {
  const router = useRouter();

  function Login(data: LoginData) {
    api
      .post(endpoint, data)
      .then((res) => {
        setCookie('accessToken', res.headers['authorization'], 120); //로그인 했을 때, 엑세스 토큰 설정
        setCookie('refreshToken', res.headers['refreshtoken'], 120); //로그인 했을 때, 리프레시 토큰 설정
      })
      .then(() => {
        //로그인 유저가 바뀔 때 발생하는 버그를 막기위해 reload설정
        successToast('로그인 되었습니다.', () => {
          router.push('/').then(() => router.reload());
        });
      })
      .catch(() => errorAlert('잠시 후에 다시 시도해주세요.', '로그인'));
  }

  function SignUp(data: LoginData) {
    api
      .post(endpoint, data)
      .then(() => {
        //회원가입에 성공하면 로그인으로 이동
        successToast('회원가입이 완료되었습니다.', () => {
          router.push('/users/login');
        });
      })
      .catch(() => errorAlert('잠시 후에 다시 시도해주세요.', '회원가입'));
  }

  return [Login, SignUp];
}
