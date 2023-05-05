import { setupWorker } from 'msw';
import { handlers } from './api';
import { postData } from './communityData';

export const worker = setupWorker(...handlers, ...postData);
