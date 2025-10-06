import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: "admin@example.com",
      hashedPassword: "hashed_pw_here",
      role: "ADMIN",
    },
  });
}

main()
  .then(() => console.log("Database seeded"))
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
