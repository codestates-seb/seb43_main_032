import { useSetRecoilState } from 'recoil';
import { loggedInUserState } from '@/recoil/atom';
import { useRouter } from 'next/router';
import { api } from '@/util/api';
import { setCookie } from '@/util/cookie';
import { LoginData } from '@/types/user';

export default function usePostApi(endpoint: string) {
  //유저 데이터 저장할 atom
  const setUser = useSetRecoilState(loggedInUserState);

  //조회에 성공하면 이동하기 위해
  const router = useRouter();

  function Login(data: LoginData) {
    api
      .post(endpoint, data)
      .then((res) => {
        setCookie('accessToken', res.headers['authorization'], 40); //로그인 했을 때, 엑세스 토큰 설정
        setCookie('refreshToken', res.headers['refreshtoken'], 40); //로그인 했을 때, 리프레시 토큰 설정
        setUser(res.data); //로그인한 유저의 데이터를 atom 관리
      })
      .then(() => {
        router.push('/');
      })
      .catch(() => alert('잠시 후에 다시 시도해주세요.'));
  }

  function SignUp(data: LoginData) {
    api
      .post(endpoint, data)
      .then(() => {
        router.push('/users/login'); //회원가입에 성공하면 로그인으로 이동
      })
      .catch(() => alert('잠시 후에 다시 시도해주세요.'));
  }

  return [Login, SignUp];
}
