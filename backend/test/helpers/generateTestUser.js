import { randomString } from "./randomString";
import { addUser } from "../../app/services/userServices";

export async function generateTestUser() {
  const test_user = {
    user_name: randomString(5)
  };
  const user_data = await addUser(test_user);
  return user_data;
}

export async function getUserId() {
  const test_user = {
    user_name: randomString(5)
  };
  const user_data = await addUser(test_user);
  return user_data.data;
}
