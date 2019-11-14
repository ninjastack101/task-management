import {
  addTask,
  deleteTask,
  updateTask,
  getAllTasks
} from "../services/taskServices";

export async function add(req, res) {
  try {
    const { title, description, user_id, deadline } = req.body;
    const task = {
      title,
      description,
      user_id,
      deadline
    };
    const response = await addTask(task);
    const socket = req.app.get("socketIo");
    socket.emit(user_id, { code: "CREATE_TASK" });
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ message: err.message || err });
  }
}

export async function update(req, res) {
  try {
    const { title, description, deadline } = req.body;
    const task = {
      title,
      description,
      deadline,
      taskId: req.params.id
    };
    const response = await updateTask(task);
    const socket = req.app.get("socketIo");
    socket.emit(response.data.user_id, { code: "UPDATE_TASK" });
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ message: err.message || err });
  }
}

export async function remove(req, res) {
  try {
    const response = await deleteTask(req.params.id);
    res.status(200).send(response);
    const socket = req.app.get("socketIo");
    socket.emit(response.data.user_id, { code: "DELETE_TASK" });
  } catch (err) {
    res.status(500).send({ message: err.message || err });
  }
}

export async function list(req, res) {
  try {
    const taskArray = await getAllTasks(req.query.user_id);
    res.status(200).send(taskArray);
  } catch (err) {
    res.status(500).send({ message: err.message || err });
  }
}
