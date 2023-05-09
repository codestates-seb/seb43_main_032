import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { getAuth } from '@/util/api/user';

export default function useAuth(): any {
  const router = useRouter();
  const { data: user, isError } = useQuery(['auth'], () => getAuth(), {
    staleTime: 1000 * 60 * 5,
    retry: 0,
  });
  if (isError) return router.push('/user/login');
  return user;
}
