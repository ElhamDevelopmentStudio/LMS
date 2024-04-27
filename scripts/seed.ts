const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Engineering" },
        { name: "Arts" },
        { name: "Literary Arts" },
        { name: "Dancing" },
      ],
    });

    console.log("Success");
  } catch (error) {
    console.log("Something went wrong seeding", error);
  } finally {
    await database.$disconnect();
  }
}

main();
