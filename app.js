import express from "express";
const app = express();

import filesRouter from "./api/files.js";
import foldersRouter from "./api/folders.js";

// JSON body parser for all routes
app.use(express.json());

// file routes
app.use("/files", filesRouter);

//folder routes
app.use("/folders", foldersRouter);

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong.");
});

export default app;
