import axios from 'axios';
import { getCookie } from '../cookie';

axios.defaults.withCredentials = true;

// const baseURL =
//   process.env.NODE_ENV === 'production'
//     ? process.env.NEXT_RESOURCE_URL
//     : 'https://d8a2-183-101-242-153.ngrok-free.app/';

const api = axios.create({
  baseURL:'https://d8a2-183-101-242-153.ngrok-free.app/',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: getCookie('accessToken'),
    // Refresh: getCookie('refreshToken'),
  },
});

export { api };
