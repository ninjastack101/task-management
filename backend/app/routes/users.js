import express from "express";
import { add, update, list } from "../controllers/userController";

const router = express.Router();

router
  .get("/", list)
  .post("/", add)
  .put("/:id", update);

module.exports = router;
