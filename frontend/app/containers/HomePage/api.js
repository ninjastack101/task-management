import { call } from "redux-saga/effects";
import request from "utils/request";
import config from "config";

export function* getTasksApi(userId) {
  const requestURL = `${config.apiRoot}/tasks?user_id=${userId}`;
  return yield call(request, requestURL);
}

export function* addTasksApi(data) {
  const requestURL = `${config.apiRoot}/tasks`;
  const option = {
    method: "POST",
    body: JSON.stringify(data)
  };
  return yield call(request, requestURL, option);
}

export function* editTasksApi(taskId, data) {
  const requestURL = `${config.apiRoot}/tasks/${taskId}`;
  const option = {
    method: "PUT",
    body: JSON.stringify(data)
  };
  return yield call(request, requestURL, option);
}

export function* deleteTasksApi(taskId) {
  const requestURL = `${config.apiRoot}/tasks/${taskId}`;
  const option = {
    method: "DELETE"
  };

  return yield call(request, requestURL, option);
}
