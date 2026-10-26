import db from "../client.js";
import { getFolderById } from "./folders.js";

export async function createFile({ name, size, folder_id }) {
  const sql = `
    INSERT INTO files
        (name, size, folder_id)
    VALUES
        ($1, $2, $3)
    RETURNING *
  `;

  const {
    rows: [file],
  } = await db.query(sql, [name, size, folder_id]);
  return file;
}

export async function getFiles() {
  const sql = `
        SELECT *
        FROM files
    `;

  const { rows: files } = await db.query(sql);

  for (const file of files) {
    const folder = await getFolderById(file.folder_id);
    file.folder_name = folder.name;
  }
  return files;
}

export async function getFilesInFolderById(folder_id) {
  const sql = `
        SELECT *
        FROM files
        WHERE folder_id = $1
    `;

  const { rows: files } = await db.query(sql, [folder_id]);
  return files;
}

export async function createFileInFolder({ name, size, folder_id }) {
  const sql = `
        INSERT INTO files
            (name, size, folder_id)
        VALUES
            ($1, $2, $3)
        RETURNING *
    `;

  const {
    rows: [file],
  } = await db.query(sql, [name, size, folder_id]);
  return file;
}
