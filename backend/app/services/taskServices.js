import models from "./../models";

const { tasks } = models;

export async function addTask(task) {
  if (!task.user_id) {
    throw new Error(`User id shouldn't be null.`);
  }
  if (!task.title) {
    throw new Error(`Task's Name shouldn't be null.`);
  }

  const taskInstance = await tasks.create({
    title: task.title,
    description: task.description,
    user_id: task.user_id,
    deadline: task.deadline
  });

  return {
    message: "Task Created successfully",
    data: { id: taskInstance.id }
  };
}

export async function updateTask(task) {
  if (!task.title) {
    throw new Error(`Task title shouldn't be null.`);
  }
  const taskExists = await tasks.findOne({
    where: { id: task.taskId }
  });

  if (!taskExists) {
    throw new Error(`Task is not available`);
  }
  await tasks.update(
    {
      title: task.title,
      description: task.description,
      deadline: task.deadline
    },
    { where: { id: task.taskId } }
  );
  return {
    message: "Task updated successfully",
    data: { id: taskExists.id, user_id: taskExists.user_id }
  };
}

export async function deleteTask(taskId) {
  if (!taskId) {
    throw `TaskId shouldn't be null.`;
  }
  const taskInstance = await tasks.findOne({
    where: { id: taskId }
  });

  if (!taskInstance) {
    throw `Task doesn't exists.`;
  }
  await taskInstance.update({ deleted: true }, { where: { id: taskId } });

  return {
    message: "Task deleted successfully",
    data: { id: taskInstance.id, user_id: taskInstance.user_id }
  };
}

export async function getAllTasks(user_id) {
  const query = { deleted: false };
  if (user_id) {
    query.user_id = user_id;
  }

  const taskInstance = await tasks.findAll({
    where: query
  });

  const taskArray = [];

  //extracting only necessary information
  for (let task of taskInstance) {
    taskArray.push({
      id: task.id,
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      deleted: task.deleted
    });
  }
  return { message: "Tasks fetched successfully", data: taskArray };
}
