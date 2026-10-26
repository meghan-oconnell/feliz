import express from "express";

const router = express.Router();

import {
  getFolders,
  getFolderById,
  getFolderWithFiles,
} from "../db/queries/folders.js";

import { createFileInFolder } from "../db/queries/files.js";

import requireBody from "../middlewares/requireBody.js";

router.route("/").get(async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});

router.param("id", async (req, res, next, id) => {
  const folder = await getFolderById(id);

  if (!folder) {
    return res.status(404).send("Folder not found.");
  }

  const completeFolder = await getFolderWithFiles(folder);

  req.folder = completeFolder;
  next();
});

router
  .route("/:id/files")
  .post(requireBody(["name", "size"]), async (req, res, next) => {
    try {
      const new_file = await createFileInFolder({
        name: req.body.name,
        size: req.body.size,
        folder_id: req.folder.id,
      });

      res.status(201).send(new_file);
    } catch (error) {
      console.error(error);
    }
  });

router.route("/:id").get(async (req, res) => {
  res.send(req.folder);
});

export default router;
