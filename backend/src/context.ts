import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

export interface Context {
  prisma: PrismaClient;
  tenantId: string | null;
}

export function createContext({ req }: any): Context {
  const token = req.headers.authorization || '';
  let tenantId = null;
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    tenantId = decoded.tenantId;
  } catch {}

  const prisma = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL } } });
  return { prisma, tenantId };
}
