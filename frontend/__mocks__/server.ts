import { setupServer } from 'msw/node';
import { handlers, projectHandlers } from './api';

module.exports.server = setupServer(...handlers, ...projectHandlers);
