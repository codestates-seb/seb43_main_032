import { setupServer } from 'msw/node';
import { handlers } from './api';
import { postData } from './communityData';

module.exports.server = setupServer(...handlers, ...postData);
