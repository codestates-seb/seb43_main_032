import { setupServer } from 'msw/node';
import { handlers, postHandler } from './api';

module.exports.server = setupServer(...handlers, ...postHandler);
