import db from "../client.js";
import { getFilesInFolderById } from "./files.js";

export async function createFolder({ name }) {
  const sql = `
        INSERT INTO folders
            (name)
        VALUES
            ($1)
        RETURNING *
    `;

  const {
    rows: [folder],
  } = await db.query(sql, [name]);
  return folder;
}

export async function getFolders() {
  const sql = `
        SELECT *
        FROM folders
    `;

  const { rows: folders } = await db.query(sql);
  return folders;
}

export async function getFolderById(id) {
  const sql = `
        SELECT *
        FROM folders
        WHERE id = $1
    `;

  const {
    rows: [folder],
  } = await db.query(sql, [id]);
  return folder;
}

export async function getFolderWithFiles(folder) {
  const files = await getFilesInFolderById(folder.id);

  if (folder && files) {
    folder.files = files;
  }

  return folder;
}
