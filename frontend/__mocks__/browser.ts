import { setupWorker } from 'msw';
import { handlers, postHandler } from './api';

export const worker = setupWorker(...handlers, ...postHandler);
