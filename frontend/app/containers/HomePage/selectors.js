import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.home || initialState;
const selectLogin = state => state.login || {};

const makeSelectTasks = () =>
  createSelector(
    selectHome,
    homeState => homeState.tasks,
  );

const makeSelectUserDetails = () =>
  createSelector(
    selectLogin,
    loginState => loginState,
  );

export { selectHome, makeSelectTasks, makeSelectUserDetails };
