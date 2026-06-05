import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const types = [
    { typeName: 'Casa' },
    { typeName: 'Trabajo' },
    { typeName: 'Movil' },
    { typeName: 'Otro' },
  ];

  for (const type of types) {
    await prisma.phoneType.upsert({
      where: { typeName: type.typeName },
      update: {},
      create: type,
    });
  }

  console.log('Seed completado, se crearon los tipos de teléfono.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
