import { setupServer } from 'msw/node';
import { handlers, communityHandler } from './api';

module.exports.server = setupServer(...handlers, ...communityHandler);
