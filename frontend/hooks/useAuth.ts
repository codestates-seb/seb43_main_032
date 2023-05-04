import axios from 'axios';
import { useQuery } from 'react-query';
import { IUser } from './useUser';
import { useRouter } from 'next/router';

export default function useAuth(): any {
  const router = useRouter();
  const { data: user, isError } = useQuery(['auth'], () => getAuth(), {
    staleTime: 1000 * 60 * 5,
    retry: 0,
  });
  if (isError) return router.push('/user/login');
  return user;
}

async function getAuth(): Promise<IUser> {
  return axios
    .get('/users/1') //
    .then((res) => res.data);
}
