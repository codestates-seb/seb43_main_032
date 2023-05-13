import { setupWorker } from 'msw';
import { handlers, projectHandlers, communityHandler } from './api';

export const worker = setupWorker(
  ...handlers,
  ...projectHandlers,
  ...communityHandler
);
