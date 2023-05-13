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
  const getUserStatus = useQuery(['loggedIn'], () => fetchUser(), {
    staleTime: Infinity,
  });

  const setUserLogOut = useMutation(logOut, {
    onSuccess: () => {
      queryClient.invalidateQueries(['loggedIn']);
    },
  });

  return {
    userQuery, //
    getUser,
    getUserStatus,
    setUserLogOut,
  };
}

async function fetchUser() {
  const response = await axios.get('/api/user/status');
  console.log('useUser', response.data);
  return response.data.ok;
}

const logOut = async () => {
  const response = await fetch('/api/user/logout', {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }
};
