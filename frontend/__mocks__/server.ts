import { setupServer } from 'msw/node';
import { handlers, projectHandlers, communityHandler } from './api';

module.exports.server = setupServer(
  ...handlers,
  ...projectHandlers,
  ...communityHandler
);
