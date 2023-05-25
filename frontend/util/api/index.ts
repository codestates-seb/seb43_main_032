import axios from 'axios';
import { getCookie } from '../cookie';

axios.defaults.withCredentials = true;

// 도메인이 고정되어버려서 굳이 유동적으로 환경변수 설정을 안해도 될 듯??
// const baseURL =
//   process.env.NODE_ENV === 'production'
//     ? process.env.NEXT_RESOURCE_URL
//     : 'https://www.side-quest-1.com';

const api = axios.create({
  baseURL: 'http://www.side-quest-1.com:8080',
  timeout: 3000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: getCookie('accessToken'),
    // Refresh: getCookie('refreshToken'),
  },
});

export { api };
