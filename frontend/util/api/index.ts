import axios from 'axios';
import { getCookie } from '../cookie';

// const baseURL =
//   process.env.NODE_ENV === 'production'
//     ? process.env.NEXT_RESOURCE_URL
//     : 'http://13.209.14.135:8080';

const baseURL = 'http://13.209.14.135:8080';

const api = axios.create({
  baseURL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: getCookie('accessToken'),
  },
});

export { api };
