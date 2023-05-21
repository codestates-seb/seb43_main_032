import axios from 'axios';
import { getCookie } from '../cookie';

axios.defaults.withCredentials = true;

const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_RESOURCE_URL
    : 'https://c3cd-183-101-242-153.ngrok-free.app/';

const api = axios.create({
  baseURL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: getCookie('accessToken'),
    // Refresh: getCookie('refreshToken'),
  },
});

export { api };
