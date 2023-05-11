import { setupWorker } from 'msw';
import { handlers, communityHandler } from './api';

export const worker = setupWorker(...handlers, ...communityHandler);
