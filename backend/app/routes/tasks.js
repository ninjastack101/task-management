import express from "express";
import { add, list, update, remove } from "../controllers/taskController";

const router = express.Router();

router
  .get("/", list)
  .post("/", add)
  .put("/:id", update)
  .delete("/:id", remove);

module.exports = router;
