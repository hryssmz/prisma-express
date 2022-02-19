import { PrismaClient } from "@prisma/client";
import { generateSalt, getHashedPassword } from "../src/utils/password";

const prisma = new PrismaClient();

const userData: [string, string][] = [
  // [username, password]
  ["alice", "secret"],
  ["john", "secret"],
];

async function main() {
  console.log("Start seeding ...");

  userData.forEach(async ([username, password]) => {
    const salt = generateSalt();
    const hashedPassword = getHashedPassword(password, salt);
    const user = await prisma.user.create({
      data: { username, hashedPassword, salt },
    });
    console.log(`Created user with id: ${user.id}`);
  });

  console.log("Seeding finished.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
