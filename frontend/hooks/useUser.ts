import { getUserById, getUsers } from '@/util/api/user';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import useApi from './useApi';

export default function useUser() {
  const queryClient = useQueryClient();
  const userQuery = useQuery(['users'], () => getUsers(), {
    staleTime: 1000 * 60 * 5,
  });
  const getUser = (id: number) =>
    useQuery(['users', id], () => getUserById(id), {
      staleTime: 1000 * 60 * 5,
    });
  const getLoggedInState = useQuery(['loggedIn'], () => fetchUser(), {
    staleTime: Infinity,
  });

  const setUserLoggedOut = useMutation(() => logOut(), {
    onSuccess: () => {
      queryClient.invalidateQueries(['loggedIn']);
    },
  });

  return {
    userQuery, //
    getUser,
    getLoggedInState,
    setUserLoggedOut,
  };
}

async function fetchUser() {
  const response = await axios.get('/api/users/me');
  return response.data.ok;
}

async function logOut() {
  const [logOutUser] = useApi('/api/users/logout');
  return await logOutUser;
}
