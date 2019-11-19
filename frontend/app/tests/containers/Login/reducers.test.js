import reducer from '../../../containers/Login/reducer';
import {
  SIGNUP_SUCCESS,
  LOGOUT
}
  from '../../../containers/Login/constants';

describe('Sign up user reducer', () => {

  let initialState = {
    username: "",
    userId: ""
  };

  it('Should return the initial state', (done) => {
    expect(reducer(undefined, {})).toEqual(initialState);
    done();
  });

  it('should handle SIGNUP_SUCCESS', (done) => {

    const startAction = {
      type: SIGNUP_SUCCESS,
      userId: "somestring",
      username: "abc",
    };
    expect(reducer(initialState, startAction)).toMatchSnapshot();
    done();
  });

  it('should handle LOGOUT', (done) => {

    const startAction = {
      type: LOGOUT,
      userId: "",
      username: ""
    };
    expect(reducer(initialState, startAction)).toMatchSnapshot();
    done();
  });
});
