import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.create({
    data: { name: 'DemoTenant' }
  });
  await prisma.user.create({
    data: { email: 'demo@example.com', password: 'secret', tenantId: tenant.id }
  });
}

main().finally(() => prisma.$disconnect());
