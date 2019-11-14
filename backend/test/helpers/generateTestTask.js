import { getUserId } from "./generateTestUser";
import { getAllTasks, addTask } from "../../app/services/taskServices";

export async function getTaskId() {
  const user_id = await getUserId();
  const data = {
    title: "Book Event",
    description: "Book event for football",
    user_id: user_id
  };
  await addTask(data);
  const tasks = await getAllTasks(user_id);
  const store = tasks.data[0];
  return store.id;
}
