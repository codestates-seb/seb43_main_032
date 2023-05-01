import { setupServer } from 'msw/node';
import { handlers } from './api';

module.exports.server = setupServer(...handlers);
