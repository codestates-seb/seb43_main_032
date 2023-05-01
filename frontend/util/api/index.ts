import axios from 'axios';
import { tokenLocalStorage } from '../local_storage/localStorage';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_RESOURCE_URL
    : 'http://localhost:8080';

const api = axios.create({
  baseURL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenLocalStorage('accessToken')}`,
  },
});

export { api };
