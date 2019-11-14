import { createSelector } from 'reselect';

const selectLogin = state => state.login || {};

const makeSelectUserDetails = () =>
  createSelector(
    selectLogin,
    loginState => loginState,
  );

export { makeSelectUserDetails };
