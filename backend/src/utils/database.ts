import { PrismaClient } from '@prisma/client';

export async function createTenantDb(name: string) {
  const prisma = new PrismaClient();
  await prisma.$executeRawUnsafe(`CREATE DATABASE \"${name}\"`);
  await prisma.$disconnect();
}
