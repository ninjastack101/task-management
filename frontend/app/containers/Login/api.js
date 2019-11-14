import { call } from "redux-saga/effects";
import request from "utils/request";
import config from "config";

export function* signUpApi(username) {
  const requestURL = `${config.apiRoot}/users`;
  const option = {
    method: "POST",
    body: JSON.stringify({ user_name: username })
  };

  return yield call(request, requestURL, option);
}
