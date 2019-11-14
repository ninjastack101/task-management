import { put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import { signUpApi } from "./api";
import { CALL_SIGNUP } from "./constants";
import { signupSuccess } from "./actions";

export function* signUp(data) {
  const { username } = data;
  try {
    const response = yield signUpApi(username);
    yield put(signupSuccess(response.data, username));
  } catch (err) {
    toast.error(err.message);
    yield put(signupSuccess("", ""));
  }
}

export default function* getData() {
  yield takeLatest(CALL_SIGNUP, signUp);
}
