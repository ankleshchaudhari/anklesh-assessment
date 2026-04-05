// Restarting TS Server or re-saving usually fixes this Prisma type error
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;

