import axios from 'axios';
import { getCookie } from '../cookie';

//어떨 때는 전역 선언만 먹히고, 어떨 때는 내부선언만 withCredentials이 먹히는데 이유를 모르겠네요...
axios.defaults.withCredentials = true;

const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_RESOURCE_URL
    : 'http://43.201.147.97:8080';

const api = axios.create({
  baseURL,
  timeout: 3000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: getCookie('accessToken'),
    // Refresh: getCookie('refreshToken'),
  },
});

export { api };
