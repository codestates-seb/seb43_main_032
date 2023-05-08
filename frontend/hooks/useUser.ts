import { getUserById, getUsers } from '@/util/api/user';
import axios from 'axios';
import { useQuery } from 'react-query';

export default function useUser() {
  // const queryClient = useQueryClient();
  const userQuery = useQuery(['users'], () => getUsers(), {
    staleTime: 1000 * 60 * 5,
  });
  const getUser = (id: number) =>
    useQuery(['users', id], () => getUserById(id), {
      staleTime: 1000 * 60 * 5,
    });
  return { userQuery, getUser };
}
