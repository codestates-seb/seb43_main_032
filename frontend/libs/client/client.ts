import { PrismaClient } from '@prisma/client';

// declare global {
//   var client: PrismaClient | undefined;
// }
// const client = global.client || new PrismaClient();

// global.client = client;

// export default client;

export default new PrismaClient();
