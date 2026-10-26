import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createFolder } from "./queries/folders.js";
import { createFile } from "./queries/files.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const folder_ids = [];

  for (let i = 0; i < 3; i++) {
    const folder_name = {
      name: faker.word.noun(),
    };

    const folder = await createFolder(folder_name);

    folder_ids.push(folder.id);
  }

  await seedFiles(folder_ids);
}

async function seedFiles(folder_ids) {
  for (let i = 0; i < folder_ids.length; i++) {
    for (let j = 0; j < 5; j++) {
      const file = {
        name: faker.company.buzzVerb(),
        size: faker.number.int({ min: 0, max: 30 }),
      };
      await createFile({
        ...file,
        folder_id: folder_ids[i],
      });
    }
  }
}
