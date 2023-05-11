import { setupWorker } from 'msw';
import { handlers, projectHandlers } from './api';

export const worker = setupWorker(...handlers, ...projectHandlers);
