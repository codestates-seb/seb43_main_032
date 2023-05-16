import { setupServer } from 'msw/node';
import { handlers, projectHandler, communityHandler, userHandler } from './api';

module.exports.server = setupServer(
  ...handlers,
  ...projectHandler,
  ...communityHandler,
  ...userHandler
);
