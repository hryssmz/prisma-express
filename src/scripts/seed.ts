import { generateSalt, getHashedPassword } from "../utils/password";
import prisma from "../utils/prisma";

const userData: [string, string][] = [
  // [username, password]
  ["alice", "secret"],
  ["john", "secret"],
];

const todoData: [string, boolean, string][] = [
  // [title, completed, owner.username]
  ["Learn Express", true, "john"],
  ["Learn Passport", false, "john"],
];

async function main() {
  console.log("Start seeding ...");

  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  userData.forEach(async ([username, password]) => {
    const salt = generateSalt();
    const hashedPassword = getHashedPassword(password, salt);
    const user = await prisma.user.create({
      data: { username, hashedPassword, salt },
    });
    console.log(`Created user with id: ${user.id}`);
  });

  todoData.forEach(async ([title, completed, username]) => {
    const owner = await prisma.user.findUnique({ where: { username } });
    if (owner === null) return;
    const todo = await prisma.todo.create({
      data: { title, completed, ownerId: owner.id },
    });
    console.log(`Created todo with id: ${todo.id}`);
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
