import configureStore from 'redux-mock-store';
import * as actions from '../../../containers/Login/actions';
import {
  CALL_SIGNUP,
  SIGNUP_SUCCESS,
  LOGOUT
}
  from '../../../containers/Login/constants';

const mockStore = configureStore();
const store = mockStore();

describe('Login actions', () => {

  beforeEach(() => {
    store.clearActions();
  });

  it('Should dispatch the signup user action', (done) => {
    const expectedActions = {
      type: CALL_SIGNUP,
    };
    expect(actions.signUpUser()).toEqual(expectedActions);
    done();
  });

  it('Should dispatch the signup success action', (done) => {
    const expectedActions = {
      type: SIGNUP_SUCCESS,
    };
    expect(actions.signupSuccess()).toEqual(expectedActions);
    done();
  });

  it('Should dispatch the user logout action', (done) => {
    const expectedActions = {
      type: LOGOUT,
    };
    expect(actions.logout()).toEqual(expectedActions);
    done();
  });
});

