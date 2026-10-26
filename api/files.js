import express from "express";
import { getFiles } from "../db/queries/files.js";

const router = express.Router();

router.route("/").get(async (req, res) => {
  const files = await getFiles();
  res.send(files);
});

export default router;
