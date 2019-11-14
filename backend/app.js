import express from "express";
import bodyParser from "body-parser";
import Model from "./app/models";
import userRoutes from "./app/routes/users";
import taskRoutes from "./app/routes/tasks.js";
import http from "http";
import IO from "socket.io";
import cors from "cors";

const port = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);

const io = IO(server);

function initMiddleware() {
  app.set("socketIo", io);
  app.use(cors());
  app.set("view engine", "ejs");
  app.use(express.static("views"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
}

function initRoutes() {
  app.use("/users", userRoutes);
  app.use("/tasks", taskRoutes);
}

function syncSequelize() {
  Model.sequelize.sync({});
}

function startServer() {
  server.listen(port, () =>
    console.log(`Task management app listening on port ${port}!`)
  );
}

initMiddleware();
initRoutes();
syncSequelize();
startServer();

module.exports = app;
