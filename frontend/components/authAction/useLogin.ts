// import { useState } from 'react';

// interface IObj {
//   isLoading: boolean;
//   data: undefined | any;
//   error: undefined | any;
// }

// export default function useApi(url: string): [(data?: any) => void, IObj] {
//   const [isLoading, setIsLoading] = useState(false);
//   const [data, setData] = useState<undefined | any>(undefined);
//   const [error, setError] = useState<undefined | any>(undefined);
//   function mutation(data?: any) {
//     setIsLoading(true);
//     fetch(url, {
//       method: 'POST',
//       body: JSON.stringify(data),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }) //
//       .then((res) => res.json())
//       .then(setData)
//       .catch(setError)
//       .finally(() => setIsLoading(false));
//   }
//   return [mutation, { isLoading, data, error }];
// }

import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { loggedInUserState } from '@/recoil/atom';
import { useRouter } from 'next/router';
import { api } from '@/util/api';
import { setCookie } from '@/util/cookie';
import { LoginData } from '@/types/user';

export default function usePostApi(endpoint: string) {
  const [isLoading, setIsLoading] = useState(false);

  //유저 데이터 저장할 atom
  const setUser = useSetRecoilState(loggedInUserState);

  //조회에 성공하면 이동하기 위해
  const router = useRouter();

  function Login(data: LoginData) {
    setIsLoading(true);
    api
      .post(endpoint, data)
      .then((res) => {
        setCookie('accessToken', res.headers['authorization'], 40); //로그인 했을 때, 쿠키 설정
        setUser(res.data); //로그인한 유저의 데이터를 atom 관리
      })
      .then(() => {
        router.push('/');
      })
      .finally(() => setIsLoading(false));
  }

  function SignUp(data: LoginData) {
    setIsLoading(true);
    api
      .post(endpoint, data)
      .then(() => {
        router.push('/users/login'); //회원가입에 성공하면 로그인으로 이동
      })
      .finally(() => setIsLoading(false));
  }

  return [Login, SignUp];
}
