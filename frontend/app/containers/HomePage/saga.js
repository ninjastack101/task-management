import { put, select, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import { setTasks } from "./actions";
import { makeSelectUserDetails } from "./selectors";
import { FETCH_TASKS, ADD_TASK, EDIT_TASK, DELETE_TASK } from "./constants";
import { getTasksApi, addTasksApi, editTasksApi, deleteTasksApi } from "./api";

export function* getTasks() {
  const userDetails = yield select(makeSelectUserDetails());
  try {
    const resp = yield getTasksApi(userDetails.userId);
    yield put(setTasks(resp.data));
  } catch (err) {
    yield put(setTasks([]));
  }
}

export function* addTasks(data) {
  const userDetails = yield select(makeSelectUserDetails());
  data.user_id = userDetails.userId;
  try {
    const resp = yield addTasksApi(data);
    toast.success(resp.message);
  } catch (err) {
    toast.error(err.message);
    console.log(err);
  }
}

export function* editTasks(data) {
  const { id, title, description, deadline } = data;
  const params = {
    title: title,
    description,
    deadline
  };
  try {
    const resp = yield editTasksApi(id, params);
    toast.success(resp.message);
  } catch (err) {
    toast.error(err.message);
    console.log(err);
  }
}

export function* deleteTasks(data) {
  const { id } = data;
  try {
    const resp = yield deleteTasksApi(id);
    toast.success(resp.message);
  } catch (err) {
    toast.error(err.message);
    console.log(err);
  }
}

export default function* getData() {
  yield takeLatest(FETCH_TASKS, getTasks);
  yield takeLatest(ADD_TASK, addTasks);
  yield takeLatest(EDIT_TASK, editTasks);
  yield takeLatest(DELETE_TASK, deleteTasks);
}
