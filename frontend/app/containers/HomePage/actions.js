import {
  FETCH_TASKS,
  LOAD_TASKS,
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK
} from "./constants";

/**
 * Call Fetch request
 *
 * @param  {string}
 *
 * @return {object} An action object with a type of FETCH_TASKS
 */
export const fetchTasks = () => {
  return {
    type: FETCH_TASKS
  };
};

/**
 * FetchTasks response
 *
 * @param  {string} id, username
 *
 * @return {object} An action object with a type of SIGNUP_SUCCESS
 */
export const setTasks = tasks => {
  return {
    type: LOAD_TASKS,
    tasks
  };
};

/**
 * Add Task response
 *
 * @param  {string} title, descrption, deadline
 *
 * @return {object} An action object with a type of SIGNUP_SUCCESS
 */
export const addTask = (title, description, deadline) => ({
  type: ADD_TASK,
  title,
  description,
  deadline
});

/**
 * Edit task response
 *
 * @param  {string} id, title, description , deadline
 *
 * @return {object} An action object with a type of SIGNUP_SUCCESS
 */
export const editTask = (id, title, description, deadline) => ({
  type: EDIT_TASK,
  title,
  description,
  deadline,
  id
});

/**
 * Edit task response
 *
 * @param  {string} id
 *
 * @return {object} An action object with a type of SIGNUP_SUCCESS
 */
export const deleteTask = id => ({
  type: DELETE_TASK,
  id
});
